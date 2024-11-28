export interface AccreditationLendingResponse {
  id: string;
  clientId: string;
  productId: number;
  providerId: number;
  amount: string;
  installmentPlanId: string;
  date: Date;
  status: Status;
}

export interface Status {
  id: number;
  name: string;
}
