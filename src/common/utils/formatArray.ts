import { DatalistProductType, PropsType, listProductType } from '../constants';

export const createArrayProduct = (
  listProduct?: DatalistProductType,
  ...element: PropsType[]
) => {
  return element.map((item: PropsType) => {
    let productID;
    if (listProduct.data.length > 0) {
      productID = listProduct.data.find((e: listProductType) =>
        e.key.toUpperCase().includes(item.keyProduct),
      );
    }
    return {
      title: item.title,
      description: item.description,
      icon: item.icon,
      navigation: {
        name: item.navigation.name,
        screen: item.navigation.screen,
      },
      disabled: item.disabled,
      showButton: item.showButton,
      pillText: item.pillText,
      pillColor: item.pillColor,
      urlLink: item.urlLink,
      keyProduct: productID || undefined,
      product: item.keyProduct
    };
  });
};
