import { HttpException } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { LoanCheckoutServiceService } from "../../integrations/loan-checkout-service/src";
import { LoansProductsServiceService } from "../../integrations/loans-products-service/src";
import { LendingService } from "./lending.service";
import { LocalizedTextService } from "./mapper/localized-text.service";

describe('LendingService', () => {
  let service: LendingService;
  let loanProductService: LoansProductsServiceService;
  let loanCheckoutService: LoanCheckoutServiceService;
  let localizedTextService: LocalizedTextService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LendingService,
        {
          provide: LoansProductsServiceService,
          useValue: { productInfo: jest.fn() },
        },
        {
          provide: LoanCheckoutServiceService,
          useValue: { lendingSimulator: jest.fn() },
        },
        {
          provide: LocalizedTextService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<LendingService>(LendingService);
    loanProductService = module.get<LoansProductsServiceService>(LoansProductsServiceService);
    loanCheckoutService = module.get<LoanCheckoutServiceService>(LoanCheckoutServiceService);
    localizedTextService = module.get<LocalizedTextService>(LocalizedTextService);
  });

  describe('lendingOnboarding', () => {
    it('should return valid response for valid productKey', async () => {
      const mockResponse = { data: { creditLine: { providerData: { amount: 1000 } }, productId: 1, data: { onboarding: true }, product: { firstExpirationDates: [], settings: { minAmount: 100 } }, balance: { availableAmount: 500 } } };
      jest.spyOn(loanProductService, 'productInfo').mockResolvedValue(mockResponse);
      const result = await service.lendingOnboarding('MICROCREDITO', true, 'clientId', 'auth');
      expect(result).toBeDefined();
      expect(result.onboarding).toBe(true);
    });

    it('should return error response when product is not found', async () => {
      const mockResponse = { error: 'Not Found' };
      jest.spyOn(loanProductService, 'productInfo').mockResolvedValue(mockResponse);
      const result = await service.lendingOnboarding('MICROCREDITO', true, 'clientId', 'auth');
      expect(result).toBeDefined();
      expect(result.message).toBe('Wording for key undefined not found.');
    });

    it('should handle error correctly', async () => {
      jest.spyOn(loanProductService, 'productInfo').mockRejectedValue(new Error('Error'));
      await expect(service.lendingOnboarding('MICROCREDITO', true, 'clientId', 'auth')).rejects.toThrow(HttpException);
    });
  });

  describe('lendingSimulator', () => {
    it('should return valid response', async () => {
      // const mockResult = { data: 'some data' };
      // jest.spyOn(loanCheckoutService, 'lendingSimulator').mockResolvedValue(mockResult);
      const result = await service.lendingSimulator({ amount: 1000, productId: 1, firstExpirationDate: '2023-01-01', clientId: 'clientId' });
      expect(result).toBeDefined();
    });

    it('should handle error correctly', async () => {
      jest.spyOn(loanCheckoutService, 'lendingSimulator').mockRejectedValue(new Error('Error'));
      await expect(service.lendingSimulator({ amount: 1000, productId: 1, firstExpirationDate: '2023-01-01', clientId: 'clientId' })).rejects.toThrow(HttpException);
    });
  });

});