import { environment } from "src/config";

export const BNPL = 'BNPL';
export const EXTRAPAY = 'EXTRAPAY';
export const BNPLSTORE = 'TERMINALES';
export const MICROCREDITO = 'MICROCREDITO';
export const TERMINALES = 'TERMINALES';

// UPDATE IF NECESSARY
/**
 * @example
 *  Producto Destacado "EXTRA PAY" -> PRODUCT_FEATURED = EXTRAPAY
 */
export const PRODUCT_FEATURED:
  | typeof BNPL
  | typeof EXTRAPAY
  | typeof MICROCREDITO
  | typeof BNPLSTORE
  | undefined = environment.PRODUCT_FEATURED;
