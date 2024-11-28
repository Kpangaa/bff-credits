import { environment } from 'src/config';
import { BNPL, BNPLSTORE, EXTRAPAY, MICROCREDITO } from './constants';

export const propsExtraPay = {
  title: 'Extra Pay',
  description: 'Activá un extra cuando lo necesites',
  icon: 'LifeguardColor',
  navigation: { name: 'ExtraPayStack', screen: 'ExtraPayRedirectScreen' },
  disabled: false,
  showButton: true,
  pillText: '',
  pillColor: '',
  keyProduct: EXTRAPAY,
};
export const propsBnpl = {
  title: 'Pago en cuotas',
  description: 'Usalo con QR o con tu tarjeta ',
  icon: 'PaperPlaneColor',
  navigation: { name: 'BnplStack', screen: 'BnplScreenRedirect' },
  disabled: false,
  showButton: true,
  pillText: '',
  pillColor: '',
  keyProduct: BNPL,
};
export const propsStoreBnpl = {
  title: 'Crédito en Tienda Personal',
  description: 'Comprá en hasta 12 cuotas',
  icon: 'Rocket',
  navigation: { name: 'ShopLendingStack', screen: 'ShopLendingOnbRoute' },
  disabled: environment.STORE_BNPL_DISABLED,
  showButton: environment.STORE_BNPL_SHOWBUTTON,
  pillText: environment.STORE_BNPL_PILL.trim(),
  pillColor: 'info',
  keyProduct: BNPLSTORE,
  urlLink: '/credits/credits/api/v1/lending-information?productKey=Terminales',
};
export const propsMicroCredit = {
  title: 'Microcréditos',
  description: 'Pedí un préstamo y aprovechá el efectivo',
  icon: 'DollarColor',
  navigation: {
    name: 'MICRO_LENDING_STACK',
    screen: 'MICRO_LENDING_ONBOARDING_ROUTE',
  },
  disabled: environment.MICRO_CREDIT_DISABLED,
  showButton: environment.MICRO_CREDIT_SHOWBUTTON,
  pillText: environment.MICRO_CREDIT_PILL.trim(),
  pillColor: 'info',
  keyProduct: MICROCREDITO,
};
