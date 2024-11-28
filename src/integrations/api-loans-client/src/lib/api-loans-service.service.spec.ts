import { Test, TestingModule } from '@nestjs/testing';
import { ApiLoansServiceService } from './api-loans-service.service';

describe('ApiLoansServiceService', () => {
  let service: ApiLoansServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiLoansServiceService],
    }).compile();

    service = module.get<ApiLoansServiceService>(ApiLoansServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
