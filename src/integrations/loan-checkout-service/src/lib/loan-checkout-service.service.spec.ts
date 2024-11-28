import { Test, TestingModule } from '@nestjs/testing';
import { LoanCheckoutServiceService } from './loan-checkout-service.service';

describe('LoanCheckoutServiceService', () => {
  let service: LoanCheckoutServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoanCheckoutServiceService],
    }).compile();

    service = module.get<LoanCheckoutServiceService>(
      LoanCheckoutServiceService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
