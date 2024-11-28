import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PepaExecutionContext } from '@pepa/common';
import { Client, RequestClient, RestResponse } from '@pepa/platform-rest';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LendingSimulatorDto } from './dto/lending.dto';
import {
  GET_LENDING_CARD_SHOP_PERSONAL,
  SIMULATION_SHOP_PERSONAL,
} from './resource/TiendaPersonal';


import { SimulatorDto } from './dto/simulator.dto';
import { AccreditationLending } from './dto/lendingAccreditation.dto';
import { UpdateOnboardingDto } from './dto/updateOnboarding.dto.';
import { LendingService } from './lending.service';
import { AccreditationLendingResponse } from './types/lending-acreditation';
import { LoansProductsServiceService } from '../../integrations/loans-products-service/src';
import { LoanCheckoutServiceService } from '../../integrations/loan-checkout-service/src';
import { CardConfig, LeningSimulatorProductType, TERMINALES } from '../../common/constants';
import { formatResponseConfigCard, formatResponseSimulator } from '../../common/utils';

@Controller()
@ApiTags('Segmentación')
@ApiBearerAuth()
export class LendingController {
  constructor(
    private context: PepaExecutionContext,
    private loanCheckoutService: LoanCheckoutServiceService,
    private loanProductService: LoansProductsServiceService,
    private lendingServices: LendingService,
  ) {}

  @Get([
    'credits/api/v1/lending-information',
    'api/credit/v1/lending-information',
  ])
  @ApiOperation({ summary: 'get configured product data' })
  async getInformationProduct(
    @Client() client: RequestClient,
    @Query('productKey') productKey: string,
    @Query('withBalance') withBalance = false,
  ) {
    const auth: string = this.context.get('token');
    const clientId = client.sub;

    const result = this.lendingServices.lendingOnboarding(
      productKey,
      withBalance,
      clientId,
      auth,
    );

    return result;
  }

  @Post('credits/api/v1/lending-simulation')
  async lendingSimulation(
    @Client() client,
    @Body() simulatorDto: SimulatorDto,
  ) {
    const clientId = client.sub;

    const { amount, firstExpirationDate, productId } = simulatorDto;

    const resultSimulation = this.lendingServices.lendingSimulator({
      amount,
      productId,
      clientId,
      firstExpirationDate,
    });

    return resultSimulation;
  }

  @Post(['credits/api/v1/simulation', 'api/credit/v1/simulation'])
  async getLeningSimulator(
    @Client() client,
    @Body() lendingSimulator: LendingSimulatorDto,
  ) {
    try {
      const clientId: string = client.sub;
      const { productId, keyProduct, firstExpirationDate, tokenHs } =
        lendingSimulator;

      const productKey: { [key: string]: LeningSimulatorProductType } = {
        [TERMINALES]: {
          ...SIMULATION_SHOP_PERSONAL,
        },
      };
      const productItemsConts = productKey[keyProduct.toUpperCase()];
      const result = await this.loanCheckoutService.lendingSimulator({
        productId: productId,
        clientId: clientId,
        firstExpirationDate: firstExpirationDate,
        mid: '35272335',
      });

      if (result.body.data.installmentPlans.length === 0) {
        throw Error('NotAvailableInstallmentPlans');
      }
      const formatResponse = formatResponseSimulator(result.body.data, tokenHs);

      const response = {
        data: {
          ...formatResponse,
          ...productItemsConts,
        },
      };
      Logger.log(response.data, 'LENDING_SIMULATION');
      return response.data;
    } catch (error) {
      if (error.message === 'NotAvailableInstallmentPlans') {
        throw new BadRequestException({
          cause: 'ERR_NO_AVAILABLE_PLANS',
          description: {
            title: 'No pudimos procesar tu solicitud',
            description:
              'No hay planes de pago disponibles en este momento. Inténtalo nuevamente más tarde.',
          },
        });
      } else {
        throw new BadRequestException({
          cause: 'ERR_BAD_REQUEST',
          description: {
            title: 'No pudimos procesar tu solicitud',
            description: 'Intentalo nuevamente más tarde',
          },
        });
      }
    }
  }

  @Post([
    'credits/api/v1/confirm-card-setting',
    'api/credit/v1/confirm-card-setting',
  ])
  async confirmCardSetting(
    @Client() client,
    @Body()
    { planId, expirationDate }: { planId: string; expirationDate: string },
  ) {
    try {
      const auth: string = this.context.get('token');

      const resultConfigCard =
        await this.loanCheckoutService.lendingCardConfiguration({
          planId: planId,
          expirationDate: expirationDate,
          clientId: client.sub,
          Authorization: auth,
        });

      if (resultConfigCard.status !== HttpStatus.CREATED) {
        throw new BadRequestException(
          resultConfigCard,
          'ErrorConfirmCardSetting',
        );
      }

      return new RestResponse(resultConfigCard.data);
    } catch (error) {
      throw new HttpException(
        {
          cause: 'ERR_BAD_REQUEST',
          description: {
            title: 'No pudimos procesar tu solicitud',
            description: 'Intentalo nuevamente más tarde',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get([
    'credits/api/v1/card-configuration/:productKey',
    'api/credit/v1/card-configuration/:productKey',
  ])
  async cardConfiguration(
    @Client() client,
    @Param('productKey') productKey: string,
  ) {
    try {
      const auth: string = this.context.get('token');
      const getConfigCard: CardConfig =
        await this.loanCheckoutService.getLendingCardConfiguration(
          client.sub,
          auth,
        );

      if (getConfigCard.statusCode === HttpStatus.NOT_FOUND) {
        return new RestResponse({
          statusCode: HttpStatus.OK,
          data: {},
        });
      }

      if (
        getConfigCard.data.cardHome.homeCardsData.paymentMethodData
          .paymentType === 'lending'
      ) {
        const responseConfigCard = formatResponseConfigCard(getConfigCard);

        const product: { [key: string]: any } = {
          [TERMINALES]: {
            ...GET_LENDING_CARD_SHOP_PERSONAL,
            ...responseConfigCard,
          },
        };

        const data = product[productKey.toUpperCase()];

        return data;
      }
      throw new Error('ErrorGetConfigCard');
    } catch (error) {
      if (error.message === 'ErrorGetConfigCard') {
        throw new BadRequestException({
          cause: 'ERR_BAD_REQUEST',
          description: {
            title: 'No pudimos procesar tu solicitud',
            description: 'Intentalo nuevamente más tarde',
          },
        });
      }
    }
  }

  @Patch([
    'credits/api/v1/update-onboarding/:productId',
    'api/credit/v1/update-onboarding/:productId',
  ])
  async updateOnboarding(
    @Client() client: RequestClient,
    @Param('productId') productId: string,
    @Body() updateOnboardingDto: UpdateOnboardingDto,
  ) {
    try {
      const clientId: string = client.sub;

      const response = await this.loanProductService.updateOnboarding(
        clientId,
        productId,
        updateOnboardingDto,
      );

      Logger.log(response, 'BFF-CREDITS - updateOnboarding');
      return response;
    } catch (error) {
      return {
        cause: 'ERR_BAD_REQUEST',
        description: {
          title: 'No pudimos procesar tu solicitud',
          description: 'Intentalo nuevamente más tarde',
        },
      };
    }
  }

  @Post('credits/api/v1/lending/confirm')
  async confirmAccreditationLending(
    @Body() body: AccreditationLending,
  ) {
    try {
      const { installmentPlanId } = body;
      const response: AccreditationLendingResponse =
        await this.loanCheckoutService.confirmAccreditation(installmentPlanId);

      const result = await this.lendingServices.confirmAccreditationLending(
        response,
      );

      if (!result || Object.keys(result).length === 0) {
        throw new BadRequestException();
      }

      Logger.log(result, 'BFF-CREDITS - confirmAccreditationLending');
      return new RestResponse(result);
    } catch (error) {
      throw new HttpException(
        {
          cause: 'ERR_BAD_REQUEST',
          description: {
            title: 'No pudimos procesar tu solicitud',
            description: 'Intentalo nuevamente más tarde',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
