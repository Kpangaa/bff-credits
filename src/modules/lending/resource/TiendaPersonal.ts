/* eslint-disable max-len */
export const LENDING_INFORMATION_SHOP_PERSONAL = {
  product: 'Tienda Personal',
  urlLink: 'https://tienda.personal.com.ar/',
  illustration: 'CardShopBag',
};

export const SIMULATION_SHOP_PERSONAL = {
  headerBalance: {
    description: 'Para usar en Tienda Personal',
  },
  backdropInfo: {
    title:
      'Tu próxima compra con tarjeta en Tienda Personal se va a financiar de esta manera. ++¿Cómo funciona?++',
    content:
      'Con tu tarjeta VISA Personal Pay podés realizar pagos en 1, 3 o 6 cuotas en la web de Tienda Personal. El interés de las cuotas se calcula teniendo en cuenta la TNA (Tasa Nominal Anual).\n\nPor motivos de seguridad, la configuración de las cuotas permanecerá activa durante 48 horas. Pasado ese periodo, podés generar una nueva configuración.',
  },
};

export const GET_LENDING_CARD_SHOP_PERSONAL = {
  titleNavbar: 'Crédito en Tienda Personal',
  ctaPrimaryButton: {
    title: 'Ir a Tienda Personal',
    urlLink: 'https://tienda.personal.com.ar/',
  },
  InfoLending:
    'Con tu tarjeta VISA Personal Pay podés realizar pagos en 1, 3 o 6 cuotas en la web de Tienda Personal. El interés de las cuotas se calcula teniendo en cuenta la TNA (Tasa Nominal Anual).\n\nPor motivos de seguridad, la configuración de las cuotas permanecerá activa durante 48 horas. Pasado ese periodo, podés generar una nueva configuración.',
  descriptionScreen: {
    title: 'Detalle de tu financiación',
    description:
      'Tu próxima compra con tarjeta en Tienda Personal se va a financiar de esta manera. ++¿Cómo funciona?++',
  },
  CtaTyc: 'Ver ++Términos y Condiciones++  y ^^Condiciones^^ ^^Particulares^^',
  urlRequestFaq: '/bff-bnpl/bnpl/api/v1/faq',
};

export const ItemsDetailSimulation = {
  AMOUNT_AVAILABLE: 'amount_available',
  FEE_AMOUNT: 'fee_amount',
  DATE_VALIDATE: 'date_validate',
  DEBIT_FIRST_FEE: 'debit_first_fee',
  COUNT_FEE: 'count_fee',
  PAYMENT_METHOD: 'payment_method',
  TNA: 'TNA',
  CFTEA: 'CFT',
};

export const ItemsValidateFormat = {
  [ItemsDetailSimulation.AMOUNT_AVAILABLE]: 'amount_available',
  [ItemsDetailSimulation.FEE_AMOUNT]: 'fee_amount',
  [ItemsDetailSimulation.DATE_VALIDATE]: 'date_validate',
  [ItemsDetailSimulation.DEBIT_FIRST_FEE]: 'debit_first_fee',
  [ItemsDetailSimulation.COUNT_FEE]: 'count_fee',
  [ItemsDetailSimulation.PAYMENT_METHOD]: 'payment_method',
  [ItemsDetailSimulation.TNA]: 'TNA',
  [ItemsDetailSimulation.CFTEA]: 'CFT',
};
