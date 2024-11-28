import { Test, TestingModule } from '@nestjs/testing';
import { FaqsService } from './faqs.service';
import { FAQS_MICRO_CREDITS } from './wording/faqs-micro-lending';
import { FAQS_SHOP_LENDING } from './wording/faqs-shop-lending';
import { HttpException } from '@nestjs/common';

describe('FaqsService', () => {
  let service: FaqsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FaqsService],
    }).compile();

    service = module.get<FaqsService>(FaqsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return FAQs for MICROCREDITO_PY', () => {
    const result = service.getFaqsLending('MICROCREDITO', 'PY');
    expect(result).toBe(FAQS_MICRO_CREDITS);
  });

  it('should return FAQs for Terminales_AR', () => {
    const result = service.getFaqsLending('Terminales', 'AR');
    expect(result).toBe(FAQS_SHOP_LENDING);
  });

  it('should throw an exception for an unknown productKey', () => {
    expect(() => {
      service.getFaqsLending('UNKNOWN_KEY', 'AR');
    }).toThrow(HttpException);
  });

  it('should throw an exception for an unknown country', () => {
    expect(() => {
      service.getFaqsLending('MICROCREDITO_PY', 'UNKNOWN_COUNTRY');
    }).toThrow(HttpException);
  });
});
