import { EnvironmentType, StageType } from '@pepa/common';
import { ProductType } from 'src/common/constants';

export interface AppConfiguration {
  env: EnvironmentType;
  stage: StageType;
  port: number;
  urlApiLoans: string;
  urlApiExtraPay: string;
  urlLoanCheckoutService: string;
  urlLoanProductService: string;
  PRODUCT_FEATURED: ProductType;
  COUNTRY: string;
  CURRENCY: string;
  STORE_BNPL_DISABLED: boolean;
  STORE_BNPL_SHOWBUTTON: boolean;
  MICRO_CREDIT_DISABLED: boolean;
  MICRO_CREDIT_SHOWBUTTON: boolean;
  STORE_BNPL_PILL: string;
  MICRO_CREDIT_PILL: string;
}
