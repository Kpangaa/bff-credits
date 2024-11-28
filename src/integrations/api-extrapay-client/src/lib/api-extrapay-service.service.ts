import { Injectable } from '@nestjs/common';
import {
  HttpClient,
  HttpClientRequestConfig,
  InjectHttpClient,
} from '@pepa/http-client';
import { RestResponse } from '@pepa/platform-rest';

@Injectable()
export class ApiExtrapayService {
  constructor(
    @((InjectHttpClient as any)('HTTP_CLIENT_API_EXTRA_PAY'))
    private clientHttpApiExtraPay: HttpClient,
  ) {}

  async getApiExtraPay(auth: string, clientId: string) {
    try {
      const config: HttpClientRequestConfig = {
        headers: {
          Authorization: auth,
        },
      };

      const requestUrl = `/v2/user/${clientId}/balance`;
      const result = await this.clientHttpApiExtraPay.get(requestUrl, config);

      return new RestResponse(result.data);
    } catch (error: any) {
      return new RestResponse(error.response.data);
    }
  }
}
