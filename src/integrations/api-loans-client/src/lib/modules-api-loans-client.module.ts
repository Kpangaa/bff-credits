import { DynamicModule, Module } from '@nestjs/common';

import { ApiLoansServiceService } from './api-loans-service.service';
import { HttpClientModule } from '@pepa/http-client';

@Module({
  controllers: [],
  providers: [ApiLoansServiceService],
  exports: [ApiLoansServiceService],
})
export class ModulesApiLoansClientModule {
  static register(options: Record<string, unknown>): DynamicModule {
    return {
      module: ModulesApiLoansClientModule,
      providers: [ApiLoansServiceService],
      exports: [ModulesApiLoansClientModule],
      imports: [
        HttpClientModule.forRoot([
          {
            name: 'HTTP_CLIENT_API_LOANS',
            baseUrl: <string>options['urlBase'],
          },
        ]),
      ],
      global: true,
    };
  }
}
