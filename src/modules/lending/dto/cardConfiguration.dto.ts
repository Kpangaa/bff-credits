import { IsString } from 'class-validator';

export class CardConfigurationDto {
  @IsString()
  planId: string;

  @IsString()
  clientId: string;

  @IsString()
  Authorization: string;

  @IsString()
  expirationDate: string;
}
