import { Test, TestingModule } from '@nestjs/testing';
import { ApiExtrapayServiceService } from './api-extrapay-service.service';

describe('ApiExtrapayServiceService', () => {
  let service: ApiExtrapayServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiExtrapayServiceService],
    }).compile();

    service = module.get<ApiExtrapayServiceService>(ApiExtrapayServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
