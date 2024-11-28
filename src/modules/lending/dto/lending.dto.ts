import { IsNumber, IsString, IsOptional } from 'class-validator';

export class LendingSimulatorDto {
  @IsNumber()
  productId: number;

  @IsString()
  keyProduct: string;

  @IsString()
  firstExpirationDate: string;

  @IsNumber()
  tokenHs: number;
}
