import { LendingSimulationResponse } from '../types/lending-simulation';
import { RestResponse } from '@pepa/platform-rest';
import { formatDate } from '../../../common/utils/formatDate';
import { ComponentRegion } from '../resource/ComponentRegion';
import { SimulatorProps } from '../../../common/constants';
import { formatCurrency } from '../../../common/utils/formatAmount';
import { environment } from 'src/config';
import { LocalizedTextService } from './localized-text.service';

export class LendingSimulatorMapper {
  static toOutput(
    input: RestResponse<SimulatorProps>,
    localizedText: LocalizedTextService,
  ) {
    const { installmentPlans, expirationDate } = input.body.data;
    installmentPlans.sort((a, b) => a.installmentQuantity - b.installmentQuantity);

    const installment = installmentPlans.map((items) => {
      const ratesText = ComponentRegion.ratesText.includes(environment.COUNTRY)
        ? `TNA: ${items.rates.TNA}% - CFTEA: ${items.rates.CFT}% `
        : `Tasa anual efectiva: ${items.rates.TNA}%`;

      const detailsPayment = {
        title: localizedText.getLocalizedText('detailsPaymentTitle'),
        itemsPaymentDetails: [
          {
            title: localizedText.getLocalizedText('totalAmountToPay'),
            rightTitle: formatCurrency({
              num: items.totalAmount.toString(),
              decimals: 2,
              withSign: true,
            }),
          },
          ComponentRegion.firstInstallment.includes(environment.COUNTRY) && {
            title: localizedText.getLocalizedText('firstInstallment'),
            rightTitle: formatCurrency({
              num: items.installmentAmount.toString(),
              decimals: 2,
              withSign: true,
            }),
          },
          {
            title: localizedText.getLocalizedText('debitFirstInstallment'),
            rightTitle: formatDate(expirationDate),
          },
          {
            title: localizedText.getLocalizedText('automaticDebit'),
            rightTitle: localizedText.getLocalizedText('moneyAccount'),
          },
        ].filter((item) => item && item.title),
        showDivider: false,
      };

      const detailsCredits = {
        title: localizedText.getLocalizedText('creditDetails'),
        itemsCreditDetails: [
          {
            title: localizedText.getLocalizedText('requestedAmount'),
            rightTitle: formatCurrency({
              num: input.body.data.amount.toString(),
              decimals: 0,
              withSign: true,
            }),
          },
          {
            title: localizedText.getLocalizedText('administrativeExpenses'),
            rightTitle: '-' + formatCurrency({
              num: items.adminCost.toString() || '0',
              decimals: 2,
              withSign: true,
            }),
          },
          {
            title: localizedText.getLocalizedText('TAX'),
            rightTitle: '-' + formatCurrency({
              num: items.adminCostVat.toString() || '0',
              decimals: 2,
              withSign: true,
            }),
          },
          {
            title: localizedText.getLocalizedText('totalCredited'),
            rightTitle: formatCurrency({
              num: (input.body.data.amount - items.adminCost - items.adminCostVat).toString() || '0',
              decimals: 2,
              withSign: true,
            }),
          },
        ],
        showDivider: true,
        showComponente: ComponentRegion.detailsCredits.includes(environment.COUNTRY),
      };

      return {
        id: items.id,
        installmentQuantity: items.installmentQuantity,
        rates: ratesText,
        detailsPayment,
        detailsCredits,
        particularConditions: items.particularConditions,
      };
    });

    const tooglesPlans = installmentPlans.map((items) => ({
      title: items.expirationDateMode === 1
        ? `${items.installmentQuantity} ${items.installmentQuantity === 1 ? 'Cuota' : 'Cuotas'}`
        : `${items.quantityDaysExpiration} días`,
    }));

    return {
      installment,
      tyc: input.body.data.tyc,
      creditsDetails: {
        amount: formatCurrency({
          num: input.body.data.amount.toString(),
          decimals: 0,
          withSign: true,
        }),
      },
      wording: {
        titleHeader: localizedText.getLocalizedText('numberInstallments'),
        titleAcceditation: localizedText.getLocalizedText('titleAcceditation'),
        primaryButton: 'Solicitar crédito',
        secondaryButton: 'Simular otro monto',
        titleCheckbox: 'Acepto los ^^Términos y Condiciones^^ y ++Términos Particulares++',
      },
      tooglesPlans,
    };
  }
}
