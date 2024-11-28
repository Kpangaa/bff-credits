import { IsString, IsBoolean, IsObject } from 'class-validator';
export class UpdateOnboardingDto {
  @IsBoolean()
  onboarding: boolean;
}
