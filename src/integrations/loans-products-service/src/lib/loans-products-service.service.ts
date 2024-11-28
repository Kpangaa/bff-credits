import { Injectable, Logger } from '@nestjs/common';
import {
  HttpClient,
  HttpClientRequestConfig,
  InjectHttpClient,
} from '@pepa/http-client';
import { ProductInfo } from 'apps/api/src/constants/types';
import { UpdateOnboardingDto } from '../../../../apps/api/src/lending/dto/updateOnboarding';

@Injectable()
export class LoansProductsServiceService {
  constructor(
    @((InjectHttpClient as any)('HTTP_CLIENT_LOAN_PRODUCT_SERVICE'))
    private clientHttpApiLoanProduct: HttpClient,
  ) {}

  async productInfo(
    auth: string,
    clientId: string,
    productKey: string,
    withBalance?: boolean,
  ) {
    try {
      const config: HttpClientRequestConfig = {
        headers: {
          Authorization: auth,
        },
      };

      const requestUrl = `/v1/client/${clientId}/product/${productKey}?balance=${withBalance}`;
      Logger.log(requestUrl, 'HTTP_CLIENT_LOAN_PRODUCT_SERVICE - productInfo');
      const resultLoans = await this.clientHttpApiLoanProduct.get<ProductInfo>(
        requestUrl,
        config,
      );

      Logger.log(
        resultLoans.data,
        'HTTP_CLIENT_LOAN_PRODUCT_SERVICE - productInfo',
      );
      return resultLoans.data;
    } catch (error: any) {
      Logger.log(error.response.data, 'HTTP_CLIENT_LOAN_PRODUCT_SERVICE_ERROR');
      return error.response.data;
    }
  }

  async updateOnboarding(
    clientId: string,
    productId: string,
    updateOnboardingDto: UpdateOnboardingDto,
  ) {
    try {
      ///v1/client/ecb72f4d-9914-4c73-a1db-ff863059c94e/product/5

      const requestUrl = `/v1/client/${clientId}/product/${productId}`;
      const resultLoans = await this.clientHttpApiLoanProduct.patch(
        requestUrl,
        { data: updateOnboardingDto },
      );

      Logger.log(
        resultLoans.data.data,
        'LOAN_PRODUCT_SERVICE - updateOnboarding',
      );
      return resultLoans.data.data;
    } catch (error: any) {
      Logger.log(error.response.data, 'HTTP_CLIENT_LOAN_PRODUCT_SERVICE_ERROR');
      return error.response.data;
    }
  }
}
