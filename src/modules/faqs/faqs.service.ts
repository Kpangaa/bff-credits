import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { FAQS_MICRO_CREDITS } from './wording/faqs-micro-lending';
import { FAQS_SHOP_LENDING } from './wording/faqs-shop-lending';

@Injectable()
export class FaqsService {
    private static readonly FAQS_MAP = {
        'MICROCREDITO_PY': FAQS_MICRO_CREDITS,
        'Terminales_AR': FAQS_SHOP_LENDING,
    };

    getFaqsLending(productKey: string, country: string) {
        try {
            const key = `${productKey}_${country}`;
            const faqs = FaqsService.FAQS_MAP[key];

            if (!faqs) {
                throw new Error('No se encontraron FAQs para el producto seleccionado');
            }

            return faqs;
        } catch (error) {
            Logger.log(error, 'FaqsService');
            throw new HttpException(
                {
                    cause: 'ERR_BAD_REQUEST',
                    description: {
                        title: 'No pudimos procesar tu solicitud',
                        description: 'Intentalo nuevamente más tarde',
                    },
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}