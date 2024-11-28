import { formatCurrency } from '../utils/formatAmount';
import { BNPL, BNPLSTORE, EXTRAPAY, MICROCREDITO } from './constants';

export const propProductFeatured = (amount: string) => {
  return {
    title: 'Producto destacado',
    amountAvailable:
      'Tenés disponible ' + formatCurrency({ num: amount, decimals: 0 }),
    pillRigth: {
      title: 'Nuevo',
      variant: 'success',
      type: 'solid',
    },
  };
};

export const BnplProps = {
  id: BNPL,
  titleRow: 'Pago en cuotas',
  description:
    'Pagá tus compras en cuotas con QR o con tu tarjeta VISA Personal Pay.',
  icon: 'DollarColor',
  navigation: { name: 'BnplStack', screen: 'BnplScreenRedirect' },
};
export const ExtraPayProps = {
  id: EXTRAPAY,
  titleRow: 'Extra Pay',
  description:
    'Activá una ayuda extra cuando te quedás sin saldo en tu cuenta.',
  icon: 'LifeguardColor',
  navigation: { name: 'ExtraPayStack', screen: 'ExtraPayRedirectScreen' },
};
export const BnplStoreProps = {
  id: BNPLSTORE,
  titleRow: 'Crédito en Tienda Personal',
  description:
    'Pedí un pequeño préstamo para usarlo en lo que necesites y pagalo más adelante.',
  icon: 'DollarColor',
  navigation: { name: 'ShopLendingStack', screen: 'ShopLendingOnbRoute' },
  urlLink: 'credits/api/credit/v1/lending-information',
};
export const MicroCreditProps = {
  id: MICROCREDITO,
  titleRow: 'Microcréditos',
  description:
    'Pedí un préstamo para usarlo en lo que necesites y pagalo más adelante.',
  icon: 'DollarColor',
  navigation: {
    name: 'MICRO_LENDING_STACK',
    screen: 'MICRO_LENDING_ONBOARDING_ROUTE',
  },
};
