import { Injectable, Logger } from '@nestjs/common';
import { BNPL, BnplProps, BNPLSTORE, BnplStoreProps, DatalistProductType, EXTRAPAY, ExtraPayProps, listProductType, MICROCREDITO, MicroCreditProps, PRODUCT_FEATURED, propProductFeatured, propsBnpl, propsExtraPay, propsMicroCredit, propsStoreBnpl } from 'src/common/constants';
import { createArrayProduct } from 'src/common/utils/formatArray';

@Injectable()
export class CreditsService {
  /**
   * @param availableCredit
   * @param availableExtraPay
   */

  getFeaturedProduct(
    availableCredit?: string,
    productSelected?: typeof PRODUCT_FEATURED,
    listProduct?: DatalistProductType,
  ) {
    if (!PRODUCT_FEATURED || !productSelected || availableCredit === undefined) {
      return null;
    }
  
    const propsText = {
      [BNPL]: propsBnpl,
      [EXTRAPAY]: propsExtraPay,
      [BNPLSTORE]: propsStoreBnpl,
      [MICROCREDITO]: propsMicroCredit,
    };
  
    const props = {
      [BNPL]: BnplProps,
      [EXTRAPAY]: ExtraPayProps,
      [BNPLSTORE]: BnplStoreProps,
      [MICROCREDITO]: MicroCreditProps,
    }[productSelected];
  
    const productFeatured = propProductFeatured(availableCredit);
    let productID: listProductType = null;
  
    if (listProduct?.data?.length > 0) {
      productID = listProduct.data.find((e: listProductType) =>
        e.key.toUpperCase().includes(productSelected),
      );
    }
  
    const extendedProd = { ...productFeatured, ...props, keyProduct: productID };
  
    const propsButtons = Object.values(propsText).filter(
      prop => prop !== propsText[extendedProd?.id],
    );
  
    const data = createArrayProduct(listProduct, ...propsButtons);
  
    Logger.log({ ...extendedProd, textsButton: data }, 'Service BFF-Credits');
  
    return { ...extendedProd, textsButton: data };
  }
}
