import { RestResponse } from '@pepa/platform-rest/.';
import {
  BNPL,
  BNPLSTORE,
  EXTRAPAY,
  MICROCREDITO,
  PRODUCT_FEATURED,
} from './constants';

export type ProductType =
  | typeof BNPL
  | typeof EXTRAPAY
  | typeof BNPLSTORE
  | typeof MICROCREDITO
  | undefined;

export type PropsType = {
  title: string;
  description: string;
  icon: string;
  navigation: PropsNavigation;
  disabled: boolean;
  showButton: boolean;
  pillText: string;
  pillColor: string;
  urlLink?: string;
  keyProduct: string;
};

export type PropsNavigation = {
  name: string;
  screen: string;
};

export type ResponseResultBnpl = {
  body: {
    availableCredit?: number;
    status?: number;
  };
};

export interface MatrixCallApiResponse {
  body: Body;
}

export interface Body {
  arrangedAmount: number;
  availableCredit: string;
  balanceAmount: number;
  productType: typeof PRODUCT_FEATURED;
  status?: number;
}

export type ApiCall = {
  productType: typeof PRODUCT_FEATURED;
  apiCall: () => Promise<RestResponse<any>>;
};

export type ProductItems = {
  product: string;
  urlLink?: string;
  creditLineLimit: string;
  tokenHs?: number;
  illustration: string;
};

export type listProductType = {
  id: number;
  name: string;
  key: string;
  tokenHs: number;
  creditLineLimit: string;
};

export type DatalistProductType = {
  statusCode?: number;
  data?: listProductType[];
};

export interface LendingSimulator {
  data: DataSimulator;
}

export interface DataSimulator {
  className: string;
  maximumAvailableAmount: number;
  firstExpirationDate: string;
  productCreditLine: ProductCreditLine;
  paymentMethod: PaymentMethod;
  availablesInstallmentPlan: AvailablesInstallmentPlan[];
  tyc: string;
}

export interface AvailablesInstallmentPlan {
  id: string;
  description: string;
  name: string;
  code: string;
  enable: boolean;
  className: string;
  periodicity: Periodicity;
  delayedDays: number;
  installmentsQuantity: number;
  maximumAmount: number;
  preApprovedId: string;
  rates: string;
  particularConditions: string;
}

export interface Periodicity {
  code: string;
  description: string;
  apiType: string;
}

export interface PaymentMethod {
  id: string;
  description: string;
  name: string;
  code: string;
  enable: boolean;
  minimumAmount: number;
  maximumAmount: number;
  className: string;
  paymentMethodType: string;
  requireFundingSource: boolean;
  availableFundingSources: [];
  discount: number;
  paymentMethodDefinitionClassName: string;
  paymentDataClassName: string;
}

export interface ProductCreditLine {
  id: string;
  description: string;
  name: string;
  code: string;
  enable: boolean;
  isDefault: boolean;
  creditLine: CreditLine;
  product: CreditLine;
}

export interface CreditLine {
  code: string;
  id: string;
  name: string;
  maximumAmount?: number;
  className?: string;
}

export type LeningSimulatorProductType = {
  headerBalance: HeaderBalance;
  backdropInfo: BackdropInfo;
};

export interface HeaderBalance {
  description: string;
}

export interface BackdropInfo {
  title: string;
  content: string;
}

export interface CardConfig {
  statusCode: number;
  data: DataData;
}

export interface DataData {
  planSelected: PlanSelected;
  cardHome: CardHome;
}

export interface CardHome {
  homeCardsData: HomeCardsData;
  minBalancePhysicalCardRequest: number;
}

export interface HomeCardsData {
  mainCardholder: MainCardholder;
  additionalCards: any[];
  paymentMethodData: PaymentMethodData;
}

export interface MainCardholder {
  cardholderId: string;
  virtualCard: AlCard;
  physicalCard: AlCard;
}

export interface AlCard {
  id: string;
  className: string;
  cardType: string;
  creationDate: Date;
  renovationDate: string;
  state: string;
  issuerSyncState: string;
  reference: string;
  cardData: CardData;
  originFinancialAccount: OriginFinancialAccount;
  labelCard?: string;
  isAdditional: boolean;
  existsPin: boolean;
  homeStatus: string;
  holderFirstName: null | string;
  holderLastname: null | string;
}

export interface CardData {
  className: string;
  expirationDateYear: number;
  expirationDateMonth: number;
  cardCapturedType: string;
}

export interface OriginFinancialAccount {
  id: string;
}

export interface PaymentMethodData {
  clientId: string;
  paymentType: string;
  paymentDetails: PaymentDetails;
}

export interface PaymentDetails {
  token_oferta: TokenOf;
  tea: number;
  tna: number;
  cftea: number;
  due_date: string;
  installments_quantity: number;
  fecha_vencimiento_token: Date;
  amount: number;
  paymentMethod: string;
  productKey: string;
  productId: number;
  planId: string;
  tycVersion: string;
}

export interface TokenOf {
  id: string;
  className: string;
  amount: number;
  date: Date;
  externalId: string;
  state: string;
  installmentsQuantity: number;
  installmentAmount: number;
  installmentsRates: string;
  account: Account;
  token: string;
  expirationDate: string;
}

export interface Account {
  id: string;
  accountNumber: number;
}

export interface PlanSelected {
  id: string;
  description: string;
  name: string;
  code: string;
  enable: boolean;
  className: string;
  periodicity: Periodicity;
  delayedDays: number;
  installmentsQuantity: number;
  maximumAmount: number;
  preApprovedId: string;
  rates: Rates;
  particularConditions: string;
  providerData: ProviderData;
  tokenOffer: TokenOf;
  firstExpirationDate: string;
  tycGenerals: TyCGenerals;
}

export interface TyCGenerals {
  tyc: string;
  tycVersion: string;
}

export interface Periodicity {
  code: string;
  description: string;
  apiType: string;
}

export interface ProviderData {
  id?: string;
  preApprovedId?: string;
  creditLineId: string;
  productCreditLineId: string;
  productId: string;
  productName: string;
}

// Loans Product
// Info Product
export interface ProductInfo {
  data: ProductInfoData;
}

export interface ProductInfoData {
  statusCode: number;
  data: DataData;
}

export interface DataData {
  clientId: string;
  productId: number;
  data: null;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  creditLineCode: string;
  creditLineLimit: string;
  product: Product;
  creditLine: CreditLine;
}

export interface CreditLine {
  id: string;
  code: string;
  amount: string;
}

export interface Product {
  id: number;
  key: string;
  name: string;
  settings: Settings;
  external_id: string;
  firstExpirationDate: string;
}

export interface Settings {
  debitDay: number;
  daysToBeInDebt: number;
  offerDaysToken: number;
  daysToBeDisabled: number;
}

export interface SimulatorProps {
  statusCode: number;
  data: simulatorDataProps;
}

export interface simulatorDataProps {
  id: string;
  loanProductId: number;
  clientId: string;
  amount: number;
  providerData: DataProviderData;
  providerId: number;
  externalReferenceId: string;
  tyc: string;
  tycVersion: string;
  expirationDate: string;
  installmentPlans: InstallmentPlan[];
  createdAt: string;
  updatedAt: string;
}

export interface InstallmentPlan {
  accreditationAmount?: number
  quantityDaysExpiration?: number;
  expirationDateMode?: number;
  expirationDate?: string
  id: string;
  providerData: InstallmentPlanProviderData;
  installmentQuantity: number;
  installmentAmount: number;
  totalAmount: number;
  rates: Rates;
  simulationId: string;
  particularConditions: string;
  createdAt: string;
  updatedAt: string;
  totalExpensive?: string;
  adminCostVat?: number
  adminCost?: number
}

export interface InstallmentPlanProviderData {
  id: string;
  preApprovedId: string;
}

export interface Rates {
  TNA: number;
  TEM: number;
  TEA: number;
  CFT: number;
  CFTNA: number;
  CFTTEA: number;
}

export interface DataProviderData {
  className?: string;
  productCreditLine?: ProductCreditLine;
  paymentMethod?: PaymentMethod;
  creditLineId: string;
  productCreditLineId: string;
  productId: string;
  productName: string;
}

export interface PaymentMethod {
  id: string;
  description: string;
  name: string;
  code: string;
  enable: boolean;
  minimumAmount: number;
  maximumAmount: number;
  className: string;
  paymentMethodType: string;
  requireFundingSource: boolean;
  availableFundingSources: [];
  discount: number;
  paymentMethodDefinitionClassName: string;
  paymentDataClassName: string;
}

export interface ProductCreditLine {
  id: string;
  description: string;
  name: string;
  code: string;
  enable: boolean;
  isDefault: boolean;
  creditLine: CreditLine;
  product: CreditLine;
}

export interface CreditLine {
  code: string;
  id: string;
  name: string;
  maximumAmount?: number;
  className?: string;
}
