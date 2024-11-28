import { Test, TestingModule } from '@nestjs/testing';
import { FaqsController } from './faqs.controller';
import { FaqsService } from './faqs.service';
import { HttpException } from '@nestjs/common';

describe('FaqsController', () => {
  let controller: FaqsController;
  let service: FaqsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FaqsController],
      providers: [
        {
          provide: FaqsService,
          useValue: {
            getFaqsLending: jest.fn(),
          },
        },
        {
          provide: 'COUNTRY',
          useValue: 'US',
        },
      ],
    }).compile();

    controller = module.get<FaqsController>(FaqsController);
    service = module.get<FaqsService>(FaqsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return faqs for a given productKey', () => {
    const productKey = 'testKey';
    const expectedFaqs = [{ question: 'What is this?', answer: 'This is a FAQ' }];
    jest.spyOn(service, 'getFaqsLending').mockReturnValue(expectedFaqs);

    const result = controller.faqsLending(productKey);
    expect(result).toEqual(expectedFaqs);
    expect(service.getFaqsLending).toHaveBeenCalledWith(productKey, 'US');
  });

  it('should throw an exception for an unknown productKey', () => {
    const productKey = 'unknownKey';
    jest.spyOn(service, 'getFaqsLending').mockImplementation(() => {
      throw new HttpException('Not Found', 404);
    });

    expect(() => controller.faqsLending(productKey)).toThrow(HttpException);
    expect(service.getFaqsLending).toHaveBeenCalledWith(productKey, 'US');
  });
});
