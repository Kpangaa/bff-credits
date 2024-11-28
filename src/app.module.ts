import { Module } from '@nestjs/common';
import { FaqsModule } from './modules/faqs';
import { CreditsModule } from './modules/credits/credits.module';
import { LendingModule } from './modules/lending/lending.module';
import { ModulesApiLoansClientModule } from './integrations/api-loans-client/src';
import { environment } from './config';
import { ModulesApiExtrapayClient } from './integrations/api-extrapay-client/src';
import { LoanCheckoutServiceModule } from './integrations/loan-checkout-service/src';
import { LoansProductsServiceModule } from './integrations/loans-products-service/src';

@Module({
  imports: [
    FaqsModule,
    CreditsModule,
    LendingModule,
    ModulesApiLoansClientModule.register({
      urlBase: environment.urlApiLoans,
    }),
    ModulesApiExtrapayClient.register({
      urlBase: environment.urlApiExtraPay,
    }),
    LoanCheckoutServiceModule.register({
      urlBase: environment.urlLoanCheckoutService,
    }),
    LoansProductsServiceModule.register({
      urlBase: environment.urlLoanProductService,
    }),
  ],
  providers: [],
})
export class AppModule {}
