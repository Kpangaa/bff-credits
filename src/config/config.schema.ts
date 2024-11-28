import { EnvironmentTypeEnum, StageTypeEnum } from '@pepa/common';

/**
 *
 * Keep configurations centralized
 *
 */
export const schema = {
  env: {
    doc: 'Runtime environment.',
    format: Object.values(EnvironmentTypeEnum),
    default: EnvironmentTypeEnum.Development,
    env: 'NODE_ENV',
  },
  stage: {
    doc: 'Runtime stage.',
    format: Object.values(StageTypeEnum),
    default: StageTypeEnum.Local,
    env: 'NODE_STAGE',
  },
  port: {
    doc: 'Api port',
    format: 'port',
    default: 8080,
    env: 'PORT',
    coerse: (val: string | number): number => {
      if (!val) {
        return 8080;
      }

      return typeof val === 'string' ? Number(val) : val;
    },
  },
  urlApiLoans: {
    doc: 'url base api loans service',
    format: '*',
    default: 'localhost',
    env: 'URL_API_LOANS',
  },
  urlApiExtraPay: {
    doc: 'url base api extra pay service',
    format: '*',
    default: 'localhost',
    env: 'URL_API_EXTRA_PAY',
  },
  urlLoanCheckoutService: {
    doc: 'url base loan checkout service',
    format: '*',
    default: 'localhost',
    env: 'URL_LOAN_CHECKOUT_SERVICE',
  },
  urlLoanProductService: {
    doc: 'url base loan product service',
    format: '*',
    default: 'localhost',
    env: 'URL_LOAN_PRODUCT_SERVICE',
  },

  PRODUCT_FEATURED: {
    doc: 'env PRODUCT_FEATURED',
    format: String,
    default: 'BNPL',
    env: 'PRODUCT_FEATURED',
  },

  COUNTRY: {
    doc: 'env Country',
    format: String,
    default: 'AR',
    env: 'COUNTRY',
  },
  CURRENCY: {
    doc: 'env CURRENCY',
    format: String,
    default: '$',
    env: 'CURRENCY',
  },

  STORE_BNPL_DISABLED: {
    doc: 'env STORE_BNPL_DISABLED',
    format: Boolean,
    default: true,
    env: 'STORE_BNPL_DISABLED',
  },
  STORE_BNPL_SHOWBUTTON: {
    doc: 'env STORE_BNPL_SHOWBUTTON',
    format: Boolean,
    default: true,
    env: 'STORE_BNPL_SHOWBUTTON',
  },
  STORE_BNPL_PILL: {
    doc: 'env STORE_BNPL_PILL',
    format: String,
    default: '',
    env: 'STORE_BNPL_PILL',
  },

  MICRO_CREDIT_DISABLED: {
    doc: 'env MICRO_CREDIT_DISABLED',
    format: Boolean,
    default: true,
    env: 'MICRO_CREDIT_DISABLED',
  },
  MICRO_CREDIT_SHOWBUTTON: {
    doc: 'env MICRO_CREDIT_SHOWBUTTON',
    format: Boolean,
    default: true,
    env: 'MICRO_CREDIT_SHOWBUTTON',
  },
  MICRO_CREDIT_PILL: {
    doc: 'env MICRO_CREDIT_PILL',
    format: String,
    default: '',
    env: 'MICRO_CREDIT_PILL',
  },
};
