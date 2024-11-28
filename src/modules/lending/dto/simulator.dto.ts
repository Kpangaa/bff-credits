import { IsNumber, IsString } from 'class-validator';
export class SimulatorDto {
  @IsNumber()
  amount: number;

  @IsString()
  firstExpirationDate: string;

  @IsNumber()
  productId: number;
}
