export interface LendingSimulationResponse {
  statusCode: number;
  data: LendingSimulation;
}

export interface LendingSimulation {
  id: string;
  loanProductId: number;
  clientId: string;
  amount: number;
  providerData: DataProviderData;
  providerId: number;
  externalReferenceId: string;
  tyc: string;
  tycVersion: string;
  installmentPlans: InstallmentPlan[];
  createdAt: string;
  updatedAt: string;
  quantityDaysExpiration?: number;
  expirationDateMode?: number;
  expirationDate?: string
  accreditationAmount?: number
}

export interface InstallmentPlan {
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
  className: string;
  productCreditLine: ProductCreditLine;
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
