/* eslint-disable max-len */

import { ProductItems } from "src/common/constants";

// Product Info

export const LendingInformationOnb = (items: ProductItems) => {
  return {
    product: `Cuotas en ${items.product}`,
    description:
      'Financiá tu compra en cuotas usando\ntu tarjeta de débito Personal Pay',
    rowItems: [
      {
        text: `Tenés **hasta $${items.creditLineLimit}** para realizar compras en ^^${items.product}^^.`,
        urlLink: items.urlLink,
      },
      {
        text: 'Configurá tu tarjeta de débito para usarla en **1, 3 o 6 cuotas** y aprovechá el beneficio.',
      },
      {
        text: `La financiación que elijas va a estar disponible durante **${items.tokenHs} horas**. Después podés utilizar una nueva.`,
      },
    ],
    illustration: items.illustration,
  };
};
