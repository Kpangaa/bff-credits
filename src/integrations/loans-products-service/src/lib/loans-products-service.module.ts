import { DynamicModule, Module } from '@nestjs/common';
import { LoansProductsServiceService } from './loans-products-service.service';
import { HttpClientModule } from '@pepa/http-client';

@Module({
  controllers: [],
  providers: [LoansProductsServiceService],
  exports: [LoansProductsServiceService],
})
export class LoansProductsServiceModule {
  static register(options: Record<string, unknown>): DynamicModule {
    return {
      module: LoansProductsServiceModule,
      providers: [LoansProductsServiceService],
      exports: [LoansProductsServiceService],
      imports: [
        HttpClientModule.forRoot([
          {
            name: 'HTTP_CLIENT_LOAN_PRODUCT_SERVICE',
            baseUrl: <string>options['urlBase'],
          },
        ]),
      ],
      global: true,
    };
  }
}
