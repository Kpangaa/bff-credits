import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import {
  HttpClient,
  HttpClientRequestConfig,
  HttpClientResponse,
  InjectHttpClient,
} from '@pepa/http-client';
import { RestResponse } from '@pepa/platform-rest';
import type {
  DatalistProductType,
  SimulatorProps,
} from '../../../../common/constants';
import { CardConfigurationDto } from '../../../../modules/lending/dto/cardConfiguration.dto';
import { SimultationDto } from '../../../../../src/modules/lending/dto/simulation.dto';

@Injectable()
export class LoanCheckoutServiceService {
  constructor(
    @((InjectHttpClient as any)('HTTP_CLIENT_LOAN_CHECKOUT_SERVICE'))
    private clientHttpApiLoanCheckout: HttpClient,
  ) {}

  async getProductClient(
    clientID: string,
  ): Promise<RestResponse<DatalistProductType>> {
    try {
      const requestUrl = `/v1/products?clientId=${clientID}`;
      const result = await this.clientHttpApiLoanCheckout.get(requestUrl);

      Logger.log(result.data, 'HTTP_CLIENT_LOAN_CHECKOUT_SERVICE');
      return new RestResponse(result.data);
    } catch (error: any) {
      Logger.log(error.response.data, 'HTTP_CLIENT_LOAN_CHECKOUT_SERVICE');
      throw new BadRequestException({
        cause: 'ERR_BAD_REQUEST',
        description: {
          title: 'No pudimos procesar tu solicitud',
          description: 'Intentalo nuevamente más tarde',
        },
      });
    }
  }

  async getProductInfo(auth: string, clientId: string, productId: number) {
    try {
      const config: HttpClientRequestConfig = {
        headers: {
          Authorization: auth,
        },
      };

      const requestUrl = `/v1/get-product-detail/client/${clientId}/product/${productId}`;
      const resultLoans = await this.clientHttpApiLoanCheckout.get(
        requestUrl,
        config,
      );

      Logger.log(resultLoans.data, 'HTTP_CLIENT_LOAN_CHECKOUT_SERVICE');
      return new RestResponse(resultLoans.data);
    } catch (error: any) {
      Logger.log(error.response.data, 'HTTP_CLIENT_LOAN_CHECKOUT_SERVICE');
      throw new BadRequestException({
        cause: 'ERR_BAD_REQUEST',
        description: {
          title: 'No pudimos procesar tu solicitud',
          description: 'Intentalo nuevamente más tarde',
        },
      });
    }
  }

  async lendingSimulator(body: SimultationDto) {
    try {
      const config = {
        clientId: body.clientId,
        productId: body.productId,
        amount: body.amount,
        mid: body.mid,
        firstExpirationDate: body.firstExpirationDate,
      };

      const requestUrl = '/v1/simulation';
      const result: HttpClientResponse<SimulatorProps> =
        await this.clientHttpApiLoanCheckout.post(requestUrl, config);

      Logger.log(
        result.data,
        'HTTP_CLIENT_LOAN_CHECKOUT_SERVICE (lendingSimulator)',
      );

      return new RestResponse(result.data);
    } catch (error: any) {
      Logger.log(
        error.response.data,
        'HTTP_CLIENT_LOAN_CHECKOUT_SERVICE (lendingSimulator)',
      );
      throw new BadRequestException({
        cause: 'ERR_BAD_REQUEST',
        description: {
          title: 'No pudimos procesar tu solicitud',
          description: 'Intentalo nuevamente más tarde',
        },
      });
    }
  }

  async lendingCardConfiguration(body: CardConfigurationDto) {
    try {
      const requestHeaders = {
        'Content-Type': 'application/json',
        Authorization: body.Authorization,
      };
      const data = {
        expirationDate: body.expirationDate,
      };

      const requestUrl = `/v1/client/${body.clientId}/configure-card/planId/${body.planId}`;
      const result: HttpClientResponse<any> =
        await this.clientHttpApiLoanCheckout.post(requestUrl, data, {
          headers: requestHeaders,
        });

      Logger.log(result.data, 'lendingCardConfiguration result');
      return result.data;
    } catch (error: any) {
      Logger.error('Error configureCard', error?.response.data);
      if (error?.response) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: error?.response.data.message,
        };
      }
      return { status: HttpStatus.BAD_REQUEST, message: error?.message };
    }
  }

  async getLendingCardConfiguration(clientId: string, auth: string) {
    try {
      const requestHeaders = {
        'Content-Type': 'application/json',
        Authorization: auth,
      };
      const requestUrl = `/v1/plan/client/${clientId}`;
      const result: HttpClientResponse<any> =
        await this.clientHttpApiLoanCheckout.get(requestUrl, {
          headers: requestHeaders,
        });

      if (result.data.statusCode === HttpStatus.NOT_FOUND) {
        return {
          statusCode: result.status,
          ...result.data,
        };
      }

      Logger.log(result.data, 'getLendingCardConfiguration result');
      return result.data;
    } catch (error: any) {
      Logger.error('Error configureCard', error?.response.data);
      if (error?.response) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error?.response.data.message,
        };
      }
      return { statusCode: HttpStatus.BAD_REQUEST, message: error?.message };
    }
  }
  async confirmAccreditation(installmentPlanId: string): Promise<any> {
    try {
      const requestUrl = `/v2/lending/confirm`;
      const result = await this.clientHttpApiLoanCheckout.post(requestUrl, {
        installmentPlanId: installmentPlanId,
      });

      Logger.log(
        result.data,
        'HTTP_CLIENT_LOAN_CHECKOUT_SERVICE - confirmAccreditation',
      );
      return result.data;
    } catch (error: any) {
      Logger.log(error.response, 'HTTP_CLIENT_LOAN_CHECKOUT_SERVICE');
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

export type lendingSimulatorProp = {
  amount: number;
  firstExpirationDate?: string;
  productId: number;
  clientId: string;
  mid?: string;
};
