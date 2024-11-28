import { DynamicModule, Module } from '@nestjs/common';
import { LoanCheckoutServiceService } from './loan-checkout-service.service';
import { HttpClientModule } from '@pepa/http-client';

@Module({
  controllers: [],
  providers: [LoanCheckoutServiceService],
  exports: [LoanCheckoutServiceService],
})
export class LoanCheckoutServiceModule {
  static register(options: Record<string, unknown>): DynamicModule {
    return {
      module: LoanCheckoutServiceModule,
      providers: [LoanCheckoutServiceService],
      exports: [LoanCheckoutServiceModule],
      imports: [
        HttpClientModule.forRoot([
          {
            name: 'HTTP_CLIENT_LOAN_CHECKOUT_SERVICE',
            baseUrl: <string>options['urlBase'],
          },
        ]),
      ],
      global: true,
    };
  }
}
