import {
  IsNumber,
  IsString,
  IsNumberString,
  IsOptional,
  IsInt,
} from 'class-validator';

export class SimultationDto {
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsNumberString()
  firstExpirationDate: string;

  @IsInt()
  productId: number;

  @IsString()
  clientId: string;

  @IsOptional()
  @IsString()
  mid?: string;
}
