import { Injectable } from '@nestjs/common';
import { texts } from '../resource/Simulation.wording';

@Injectable()
export class LocalizedTextService {
  private country: string;

  constructor(country: string) {
    this.country = country;
  }

  getLocalizedText(key: keyof typeof texts.Simulation): string {
    return texts.Simulation[key][this.country];
  }

  setCountry(newCountry: string): void {
    this.country = newCountry;
  }
}
