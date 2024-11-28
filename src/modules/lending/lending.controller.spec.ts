import { LendingController } from './lending.controller';
import { LendingService } from './lending.service';
import { LoansProductsServiceService } from '../../integrations/loans-products-service/src';
import { LoanCheckoutServiceService } from '../../integrations/loan-checkout-service/src';
import { PepaExecutionContext } from '@pepa/common';
import { BadRequestException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('LendingController', () => {
  let controller: LendingController;
  let lendingService: LendingService;
  let loanProductService: LoansProductsServiceService;
  let loanCheckoutService: LoanCheckoutServiceService;
  let context: PepaExecutionContext;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LendingController],
      providers: [
        LendingService,
        LoansProductsServiceService,
        LoanCheckoutServiceService,
        PepaExecutionContext,
      ],
    }).compile();

    controller = module.get<LendingController>(LendingController);
    lendingService = module.get<LendingService>(LendingService);
    loanProductService = module.get<LoansProductsServiceService>(LoansProductsServiceService);
    loanCheckoutService = module.get<LoanCheckoutServiceService>(LoanCheckoutServiceService);
    context = module.get<PepaExecutionContext>(PepaExecutionContext);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getInformationProduct', () => {
    it('should return product information', async () => {
      const result = { data: 'some data' };
      jest.spyOn(lendingService, 'lendingOnboarding').mockResolvedValue(result);

      expect(await controller.getInformationProduct({ sub: 'client1' }, 'productKey', true)).toBe(result);
    });
  });

  describe('lendingSimulation', () => {
    it('should return simulation result', async () => {
      const result = { data: 'simulation data' };
      // jest.spyOn(lendingService, 'lendingSimulator').mockResolvedValue(result);

      expect(await controller.lendingSimulation({ sub: 'client1' }, { amount: 1000, firstExpirationDate: '2023-01-01', productId: 2 })).toBe(result);
    });
  });

  describe('getLeningSimulator', () => {
    it('should return lending simulator data', async () => {
      const result = { data: 'simulator data' };
      jest.spyOn(loanCheckoutService, 'lendingSimulator').mockResolvedValue({ body: {
        data: {
          installmentPlans: [{
            id: '123123',
            providerData: {
              id: 'aasda',
              preApprovedId: 'asda'
            },
            installmentQuantity: 123,
            installmentAmount: 43,
            totalAmount: 5345,
            rates: {
              TNA: 0.05,
              TEM: 0.04,
              TEA: 0.06,
              CFT: 0.07,
              CFTNA: 0.08,
              CFTTEA: 0.09,
            },
            simulationId: 'abc123',
            particularConditions: 'Some conditions',
            createdAt: '2023-01-01',
            updatedAt: '2023-01-01'
          }],
          id: '',
          loanProductId: 0,
          clientId: '',
          amount: 0,
          providerData: undefined,
          providerId: 0,
          externalReferenceId: '',
          tyc: '',
          tycVersion: '',
          expirationDate: '',
          createdAt: '',
          updatedAt: ''
        },
        statusCode: 0
      } });
      // jest.spyOn(lendingService, 'lendingSimulator').mockResolvedValue(result);

      expect(await controller.getLeningSimulator({ sub: 'client1' }, { productId: 2 , keyProduct: 'key', firstExpirationDate: '2023-01-01', tokenHs: 0 })).toBe(result);
    });

    it('should throw BadRequestException if no installment plans available', async () => {
      jest.spyOn(loanCheckoutService, 'lendingSimulator').mockResolvedValue({ body: {
        data: {
          installmentPlans: [],
          id: '',
          loanProductId: 0,
          clientId: '',
          amount: 0,
          providerData: undefined,
          providerId: 0,
          externalReferenceId: '',
          tyc: '',
          tycVersion: '',
          expirationDate: '',
          createdAt: '',
          updatedAt: ''
        },
        statusCode: 0
      } });

      await expect(controller.getLeningSimulator({ sub: 'client1' }, { productId: 1, keyProduct: 'key', firstExpirationDate: '2023-01-01', tokenHs: 2 })).rejects.toThrow(BadRequestException);
    });
  });

  describe('confirmCardSetting', () => {
    it('should return card configuration result', async () => {
      const result = { status: HttpStatus.CREATED, data: 'config data' };
      jest.spyOn(loanCheckoutService, 'lendingCardConfiguration').mockResolvedValue(result);

      expect(await controller.confirmCardSetting({ sub: 'client1' }, { planId: 'plan1', expirationDate: '2023-01-01' })).toEqual({ data: 'config data' });
    });

    it('should throw BadRequestException if status is not CREATED', async () => {
      const result = { status: HttpStatus.BAD_REQUEST, data: 'error data' };
      jest.spyOn(loanCheckoutService, 'lendingCardConfiguration').mockResolvedValue(result);

      await expect(controller.confirmCardSetting({ sub: 'client1' }, { planId: 'plan1', expirationDate: '2023-01-01' })).rejects.toThrow(BadRequestException);
    });
  });

  describe('cardConfiguration', () => {
    it('should return card configuration data', async () => {
      const result = { statusCode: HttpStatus.OK, data: { cardHome: { homeCardsData: { paymentMethodData: { paymentType: 'lending' } } } } };
      jest.spyOn(loanCheckoutService, 'getLendingCardConfiguration').mockResolvedValue(result);

      expect(await controller.cardConfiguration({ sub: 'client1' }, 'productKey')).toEqual(result.data);
    });

    it('should throw BadRequestException if error occurs', async () => {
      jest.spyOn(loanCheckoutService, 'getLendingCardConfiguration').mockRejectedValue(new Error('ErrorGetConfigCard'));

      await expect(controller.cardConfiguration({ sub: 'client1' }, 'productKey')).rejects.toThrow(BadRequestException);
    });
  });

  describe('updateOnboarding', () => {
    it('should return update onboarding response', async () => {
      const result = { data: 'update data' };
      jest.spyOn(loanProductService, 'updateOnboarding').mockResolvedValue(result);

      expect(await controller.updateOnboarding({ sub: 'client1' }, 'product1', { onboarding: false })).toBe(result);
    });
  });

  describe('confirmAccreditationLending', () => {
    it('should return accreditation lending response', async () => {
      const response = { data: 'accreditation data' };
      jest.spyOn(loanCheckoutService, 'confirmAccreditation').mockResolvedValue(response);
      jest.spyOn(lendingService, 'confirmAccreditationLending').mockResolvedValue(response);

      expect(await controller.confirmAccreditationLending({ installmentPlanId: 'plan1' })).toEqual({ data: 'accreditation data' });
    });

    it('should throw BadRequestException if result is empty', async () => {
      jest.spyOn(loanCheckoutService, 'confirmAccreditation').mockResolvedValue({});
      jest.spyOn(lendingService, 'confirmAccreditationLending').mockResolvedValue({});

      await expect(controller.confirmAccreditationLending({ installmentPlanId: 'plan1' })).rejects.toThrow(BadRequestException);
    });
  });
});