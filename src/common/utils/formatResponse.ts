import { ItemsValidateFormat } from '../../modules/lending/resource/TiendaPersonal';
import { formatCurrency } from '../utils/formatAmount';
import { CardConfig, simulatorDataProps } from 'src/common/constants';
import { formatDate, formatDateValidate } from './formatDate';

export const formatResponseSimulator = (
  data: simulatorDataProps,
  tokenHs: number,
) => {
  data.installmentPlans.sort(
    (a, b) => a.installmentQuantity - b.installmentQuantity,
  );
  const response = {
    cuotas: data.installmentPlans.map(plan => ({
      value: plan.id,
      title: `${plan.installmentQuantity} ${
        plan.installmentQuantity === 1 ? 'Cuota' : 'Cuotas'
      }`,
      subtitle: `${formatCurrency({
        num: (plan.installmentAmount * plan.installmentQuantity).toString(),
        decimals: 0,
      })}`,
      titleRight: `${formatCurrency({
        num: plan.totalAmount.toString(),
        decimals: 0,
      })}`,
      subTitleRight: `TNA ${plan.rates.TNA}%`,
      details: [
        {
          keyItem: 'amount_available',
          title: 'Monto financiado',
          value: `${formatCurrency({
            num: data.amount.toString(),
            decimals: 0,
          })}`,
        },
        {
          keyItem: 'fee_amount',
          title: 'Monto de la cuota',
          value: `${formatCurrency({
            num: plan.installmentAmount.toString(),
            decimals: 0,
          })}`,
        },
        {
          keyItem: 'date_validate',
          title: 'Válido hasta',
          value: formatDateValidate(tokenHs / 24),
        },
        {
          keyItem: 'debit_first_fee',
          title: 'Débito primera cuota',
          value: formatDate(data.expirationDate),
        },
        {
          keyItem: 'count_fee',
          title: 'Número de cuotas',
          value: plan.installmentQuantity,
        },
        {
          keyItem: 'payment_method',
          title: 'Modalidad de pago',
          value: 'Débito automático',
        },
        {
          keyItem: 'TNA',
          title: 'TNA',
          value: `${plan.rates.TNA}%`,
        },
        {
          keyItem: 'CFT',
          title: 'CFTEA',
          value: `${plan.rates.CFT}%`,
        },
      ].filter(detail => detail.keyItem in ItemsValidateFormat),
      particularCondition: plan.particularConditions,
    })),
    amountAvailable: data.amount.toString(),
    debitfirstpay: formatDate(data.expirationDate),
    termAndCondition: data.tyc,
  };
  return response;
};

export const formatResponseConfigCard = (getConfigCard: CardConfig) => {
  const getConfigCardProducts = {
    timerHs: getConfigCard.data.planSelected.tokenOffer.expirationDate.replace(
      '-',
      ' ',
    ),
    amountAvailable: getConfigCard.data.planSelected.tokenOffer.amount,
    fee: getConfigCard.data.planSelected.tokenOffer.installmentsQuantity,
    tyc: getConfigCard.data.planSelected.tycGenerals.tyc,
    cp: getConfigCard.data.planSelected.particularConditions,
    details: [
      {
        keyItem: 'amount_available',
        title: 'Monto financiado',
        value: `${formatCurrency({
          num: getConfigCard.data.planSelected.tokenOffer.amount.toString(),
          decimals: 0,
        })}`,
      },
      {
        keyItem: 'fee_amount',
        title: 'Monto de la cuota',
        value: `${formatCurrency({
          num: getConfigCard.data.planSelected.tokenOffer.installmentAmount.toString(),
          decimals: 0,
        })}`,
      },
      {
        keyItem: 'date_validate',
        title: 'Válido hasta',
        value: getConfigCard.data.planSelected.tokenOffer.expirationDate.slice(
          0,
          10,
        ),
      },
      {
        keyItem: 'debit_first_fee',
        title: 'Débito primera cuota',
        value: formatDate(getConfigCard.data.planSelected.firstExpirationDate),
      },
      {
        keyItem: 'count_fee',
        title: 'Número de cuotas',
        value: getConfigCard.data.planSelected.tokenOffer.installmentsQuantity,
      },
      {
        keyItem: 'payment_method',
        title: 'Modalidad de pago',
        value: 'Débito automático',
      },
      {
        keyItem: 'TNA',
        title: 'TNA',
        value: `${getConfigCard.data.planSelected.rates.TNA}%`,
      },
      {
        keyItem: 'CFT',
        title: 'CFTEA',
        value: `${getConfigCard.data.planSelected.rates.CFT}%`,
      },
    ].filter(detail => detail.keyItem in ItemsValidateFormat),
  };

  return getConfigCardProducts;
};
