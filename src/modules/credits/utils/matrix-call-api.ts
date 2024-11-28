import { RestResponse } from '@pepa/platform-rest';
import { PRODUCT_FEATURED, MatrixCallApiResponse, ApiCall, BNPL, EXTRAPAY, MICROCREDITO } from 'src/common/constants';
import { ApiExtrapayService } from 'src/integrations/api-extrapay-client/src';
import { ApiLoansServiceService } from 'src/integrations/api-loans-client/src';
import { LoansProductsServiceService } from 'src/integrations/loans-products-service/src';


const PRODUCT_FEATURED_DISABLED = ['MICROCREDITO', 'Terminales'];

export const MatrixCallApi = (
  ProductFeatured: typeof PRODUCT_FEATURED,
  auth: string,
  clientId: string,
  loan: ApiLoansServiceService,
  extrapay: ApiExtrapayService,
  loanProductService: LoansProductsServiceService,
): MatrixCallApiResponse => {
  let result: any | undefined = undefined;
  const apiCalls: ApiCall[] = [
    {
      productType: BNPL,
      apiCall: async () => {
        const value = await loan.getapiloan(auth);
        return value;
      },
    },
    {
      productType: EXTRAPAY,
      apiCall: async () => {
        const value = await extrapay.getApiExtraPay(auth, clientId);
        return value;
      },
    },
    {
      productType: MICROCREDITO,
      apiCall: async () => {
        const value = await loanProductService.productInfo(
          auth,
          clientId,
          ProductFeatured,
        );
        return {
          body: {
            availableCredit: value.data?.creditLine?.providerData?.amount,
          },
        };
      },
    },
  ];

  const apiCall = async () => {
    let productType: typeof PRODUCT_FEATURED;
    let throwError: boolean = false;

    if (ProductFeatured === undefined) {
      return {
        body: { availableCredit: undefined, productType: undefined },
      };
    }

    for (let i of apiCalls) {
      if (ProductFeatured === i.productType) {
        const result = await i.apiCall();
        productType = i.productType;

        if (
          result?.body?.availableCredit > 0 &&
          !PRODUCT_FEATURED_DISABLED.includes(ProductFeatured)
        ) {
          return new RestResponse({ ...result.body, productType });
        } else {
          const othersCall = apiCalls.filter(
            call =>
              call.productType !== ProductFeatured &&
              !PRODUCT_FEATURED_DISABLED.includes(call.productType),
          );
          for (let a of othersCall) {
            const result = await a.apiCall();
            productType = a.productType;
            if (result?.body?.availableCredit > 0) {
              return new RestResponse({ ...result.body, productType });
            } else {
              throwError = true;
              continue;
            }
          }
        }
      } else {
        continue;
      }
    }

    if (throwError) {
      return {
        body: { availableCredit: undefined, productType: undefined },
      };
    }
  };

  result = apiCall();

  return result;
};
