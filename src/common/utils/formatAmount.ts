import { environment } from "../../config/environment";

export type formatCurrencyProps = {
  num: string;
  decimals?: number;
  withSign?: boolean;
};

export const formatCurrency = (props: formatCurrencyProps): string => {
  const { num = '', decimals = 2, withSign = true } = props;
  const parseNumber: number = parseFloat(num);
  const numDecimals: number = decimals;
  const formatWithFixedPoint: string = parseNumber
    .toFixed(numDecimals)
    .replace('.', ',');

  let formatted: string = formatWithFixedPoint.replace(
    /(\d)(?=(\d\d\d)+(?!\d))/g,
    '$1.',
  );

  if (withSign) {
    formatted = `${environment.CURRENCY}${formatted}`;
  }
  return formatted;
};
