import { IsString } from 'class-validator';
export class AccreditationLending {
  @IsString()
  installmentPlanId?: string;
}
