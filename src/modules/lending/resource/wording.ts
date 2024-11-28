/* eslint-disable max-len */
export const wording = {
  AR: {
    microcredito: {
      informationLending: {
        infoMicroLending: {
          product: 'MicroCredito',
          title: '¡Pedí el monto que necesitás y lo depositamos en minutos!',
          description: 'Aprovechá nuestros créditos personales',
          itemsRows: [
            {
              text: 'Tenés **hasta {{creditLineLimit}}** disponibles.',
            },
            {
              text: 'Podés pagar en **1, 3 o 6 cuotas fijas** mensuales.',
            },
            {
              text: 'Recordá tener dinero en tu cuenta al momento de debitar los pagos.',
            },
          ],
          buttonPrimary: 'Simular crédito',
          illustration: 'Rocket',
          navigation: 'continue',
        },
        infounassignedMicroLending: {
          title: 'Pronto podrás tener crédito disponible para pagar en cuotas',
          description: 'Te recomendamos:',
          itemsRows: [
            {
              text: 'Utilizá tu billetera Personal Pay para tus pagos, consumos y movimientos',
            },
            {
              text: 'Acordate de pagar a tiempo todos tus préstamos, sean con Personal Pay o no.',
            },
            {
              text: 'Revisá más adelante si hay cambios. El perfil crediticio se actualiza regularmente',
            },
          ],
          buttonPrimary: 'Ir al inicio',
          illustration: 'Dolar',
          navigation: 'goback',
        },
      },
    },
    terminales: {
      informationLending: {
        infoShopLending: {
          product: 'Cuotas en Tienda Personal',
          title: '¡Pedí el monto que necesitás y lo depositamos en minutos!',
          description:
            'Financiá tu compra en cuotas usando\ntu tarjeta de débito Personal Pay',
          itemsRows: [
            {
              text: 'Tenés **hasta {{creditLineLimit}}** para realizar compras en ^^Tienda Personal^^.',
              urlLink: 'https://tienda.personal.com.ar/',
            },
            {
              text: 'Configurá tu tarjeta de débito para usarla en **hasta 12 cuotas** y aprovechá el beneficio.',
            },
            {
              text: 'La financiación que elijas va a estar disponible durante **{{tokenHs}} horas**. Después podés utilizar una nueva.',
            },
          ],
          buttonPrimary: 'Continuar',
          illustration: 'CardShopBag',
        },
        infounassignedShop: {
          product: 'Pronto podrás pagar en cuotas en Tienda Personal',
          description: 'Para acceder a la línea de crédito te\nrecomendamos:',
          itemsRows: [
            {
              text: 'Utilizar tu billetera Personal Pay para tus pagos y consumos.',
            },
            {
              text: 'Pagar a tiempo todos tus préstamos, sean con Personal Pay o no.',
            },
            {
              text: 'Revisar esta sección para ver actualizaciones sobre tu perfil crediticio.',
            },
          ],
          buttonPrimary: 'Ir al inicio',
          illustration: 'ShopMyBusiness',
          navigation: 'goback',
        },
      },
    },
  },
  PY: {
    microcredito: {
      informationLending: {
        infoMicroLending: {
          product: 'MicroCredito',
          title: '¡Pedí el monto que necesitás y lo depositamos en minutos!',
          description: 'Aprovechá nuestros créditos personales',
          itemsRows: [
            {
              text: 'Tenés **hasta {{creditLineLimit}}** disponibles para pagar tu crédito en **7, 14 o 21 días**.',
            },
            {
              text: 'Aplicaremos intereses e impuestos al dinero que solicites.',
            },
            {
              text: 'Recordá tener el dinero necesario en tu cuenta al momento de debitar el pago.',
            },
          ],
          buttonPrimary: 'Simular crédito',
          illustration: 'Rocket',
          navigation: 'continue',
        },
        infounassignedMicroLending: {
          title: 'Pronto podrás tener crédito disponible para pagar en cuotas',
          description: 'Te recomendamos:',
          itemsRows: [
            {
              text: 'Utilizá tu billetera Personal Pay para tus pagos, consumos y movimientos',
            },
            {
              text: 'Acordate de pagar a tiempo todos tus préstamos, sean con Personal Pay o no.',
            },
            {
              text: 'Revisá más adelante si hay cambios. El perfil crediticio se actualiza regularmente',
            },
          ],
          buttonPrimary: 'Ir al inicio',
          illustration: 'Dolar',
          navigation: 'goback',
        },
      },
    },
  },
} as const;
