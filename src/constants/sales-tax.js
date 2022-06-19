export const SALES_TAX_NORMAL_RATE = 0.1
export const SALES_TAX_LOWERED_RATE = 0.08

export function getPriceWithNormalTax (price) {
  return Math.floor(price * (1 + SALES_TAX_NORMAL_RATE))
}

export function getPriceWithLoweredTax (price) {
  return Math.floor(price * (1 + SALES_TAX_LOWERED_RATE))
}
