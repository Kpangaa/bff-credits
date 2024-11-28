import { Injectable, Logger } from '@nestjs/common';
import {
  HttpClient,
  HttpClientRequestConfig,
  InjectHttpClient,
} from '@pepa/http-client';
import { RestResponse } from '@pepa/platform-rest';

@Injectable()
export class ApiLoansServiceService {
  constructor(
    @((InjectHttpClient as any)('HTTP_CLIENT_API_LOANS'))
    private clientHttpApiLoans: HttpClient,
  ) {}

  async getapiloan(auth: string) {
    try {
      const config: HttpClientRequestConfig = {
        headers: {
          Authorization: auth,
        },
        params: {
          productKey: 'BNPL',
        },
      };

      const requestUrl = '/api/v1/loans/balance';
      const result = await this.clientHttpApiLoans.get(requestUrl, config);

      return new RestResponse(result.data);
    } catch (error: any) {
      Logger.log(`${error}`, 'API_LOAN_SERVICE');
      return new RestResponse(error.response?.data);
    }
  }
}
