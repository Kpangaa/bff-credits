import { Test, TestingModule } from '@nestjs/testing';
import { LendingController } from './lending.controller';
import { LendingService } from './lending.service';

describe('LendingController', () => {
  let controller: LendingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LendingController],
      providers: [LendingService],
    }).compile();

    controller = module.get<LendingController>(LendingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
