import { Test } from '@nestjs/testing';
import { LoansProductsServiceService } from './loans-products-service.service';

describe('LoansProductsServiceService', () => {
  let service: LoansProductsServiceService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [LoansProductsServiceService],
    }).compile();

    service = module.get(LoansProductsServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
