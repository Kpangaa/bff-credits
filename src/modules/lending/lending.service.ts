import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { STATUS_ACCREDITATION_LENDING } from '../../common/constants/lending-simulator';
import { LendingSimulatorMapper } from './mapper/Simulation.mapper';
import { LocalizedTextService } from './mapper/localized-text.service';
import { wording } from './resource/wording';
import { AccreditationLendingResponse } from './types/lending-acreditation';
import { MICROCREDITO, TERMINALES } from 'src/common/constants';
import { getWordingByKey, replacePlaceholders } from 'src/common/utils';
import { formatCurrency } from '../../common/utils/formatAmount';
import { environment } from 'src/config';
import { LoanCheckoutServiceService } from 'src/integrations/loan-checkout-service/src';
import { LoansProductsServiceService } from 'src/integrations/loans-products-service/src';

@Injectable()
export class LendingService {
  constructor(
    private loanProductService: LoansProductsServiceService,
    private loanCheckoutService: LoanCheckoutServiceService,
    private localizedTextService: LocalizedTextService,
  ) {}

  async lendingOnboarding(
    productKey: string,
    withBalance: boolean,
    clientId: string,
    auth: string,
  ) {
    try {
      const response = await this.loanProductService.productInfo(
        auth,
        clientId,
        productKey,
        withBalance,
      );

      Logger.log(response, '[RESPONSE HTTP_CLIENT_LOAN_PRODUCT_SERVICE]');
      
      const isNotFound = response.error === 'Not Found';
      const stepMicroLending = isNotFound ? 'infounassignedMicroLending' : 'infoMicroLending';
      const stepShopLending = isNotFound ? 'infounassignedShop' : 'infoShopLending';

      const products = {
        [MICROCREDITO]: {
          productName: productKey.toLowerCase(),
          creditLineLimit: formatCurrency({
            num: response.data?.creditLine?.providerData?.amount,
            decimals: 0,
          }),
          screen: 'informationLending',
          step: stepMicroLending,
          idProducts: response.data?.productId,
          onboarding: response.data?.data?.onboarding,
          firstExpirationDates: response.data?.product?.firstExpirationDates,
          availableAmount: response.data?.balance?.availableAmount,
          minAmount: response.data?.product?.settings?.minAmount,
        },
        [TERMINALES]: {
          productName: productKey.toLowerCase(),
          creditLineLimit: formatCurrency({
            num: response.data?.creditLine?.providerData?.amount,
            decimals: 0,
          }),
          tokenHs: response.data?.product?.settings?.offerDaysToken * 24,
          screen: 'informationLending',
          step: stepShopLending,
          firstExpirationDates: response.data?.product?.firstExpirationDates,
          idProducts: response.data?.productId,
          onboarding: response.data?.data?.onboarding,
        },
      }[productKey.toUpperCase()];

      const dataWordingRoute = `${environment.COUNTRY}.${products.productName}.${products.screen}.${products.step}`;

      const wordingSpecificProduct = getWordingByKey(wording, dataWordingRoute);

      if (!wordingSpecificProduct) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Wording for key ${dataWordingRoute} not found.`,
        };
      }

      wordingSpecificProduct.itemsRows = wordingSpecificProduct.itemsRows.map(item => ({
        ...item,
        text: replacePlaceholders(item.text, { ...products }),
      }));

      return {
        ...wordingSpecificProduct,
        onboarding: products.onboarding,
        idProducts: products.idProducts,
        firstExpirationDates: products.firstExpirationDates,
        availableAmount: products.availableAmount,
        minAmount: products.minAmount,
      };
    } catch (error) {
      Logger.error(error, 'ERR_BAD_REQUEST');
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

  async lendingSimulator({
    amount,
    productId,
    firstExpirationDate,
    clientId,
  }: {
    amount: number;
    productId: number;
    firstExpirationDate: string;
    clientId: string;
  }) {
    try {
      Logger.log(
        firstExpirationDate,
        `firstExpirationDate [${firstExpirationDate}]`,
      );
      const result = await this.loanCheckoutService.lendingSimulator({
        amount,
        productId,
        clientId,
        firstExpirationDate,
      });

      const output = LendingSimulatorMapper.toOutput(
        result,
        this.localizedTextService,
      );
      return output;
    } catch (error) {
      Logger.log(error, `LendingSimulator - productId ${productId}`);
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

  async confirmAccreditationLending(
    responseAccreditation: AccreditationLendingResponse,
  ) {
    const mappedFeedback = {
      [STATUS_ACCREDITATION_LENDING.CONFIRM]: {
        title: 'El dinero se acreditó en tu cuenta',
        description: 'Ya podés usarlo para lo que necesites.',
        titlePrimarybutton: 'Volver a Préstamos',
        status: { id: responseAccreditation.status.id, name: 'success' },
      },
      [STATUS_ACCREDITATION_LENDING.PENDING]: {
        title: 'En minutos se acreditará tu dinero',
        description: 'Te vamos a avisar cuando esté listo',
        titlePrimarybutton: 'Volver a Préstamos',
        status: { id: responseAccreditation.status.id, name: 'pending' },
      },
    };

    return mappedFeedback[responseAccreditation.status.id] || {};
  }
}
