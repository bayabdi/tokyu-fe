// the vue will be set from App.vue.

import { ProductTypeId } from './constants/product'
import { jaShortDate, jaShortDateWithDow, jaLongDate, jaLongDateSlash } from './utils/get-date'

export function percent (float) {
  return `${Math.round(float * 100)}%`
}

export function toThousands (num) {
  num = Number(num)
  if (isNaN(num)) return ''
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default {
  toThousands,
  productNameEn (productId) {
    return ProductTypeId[productId].nameEn
  },
  productNameJa (productId) {
    return ProductTypeId[productId].name
  },
  newBookingName (productId) {
    return ProductTypeId[productId].newBookingName
  },
  jaShortDate,
  jaShortDateWithDow,
  jaLongDate,
  jaLongDateSlash,
  postalCode (postalCode) {
    if (!postalCode) return ''
    if (postalCode.includes('-')) return postalCode
    if (postalCode.length <= 3) return postalCode
    return `〒${postalCode.slice(0, 3)}-${postalCode.slice(3)}`
  },
  percent,
  rentalPeriod (periodType) {
    switch (periodType) {
      case 'Day': return '1日'
      case 'Stay': return '1滞在'
      default: return periodType
    }
  },
  jpy (price) {
    return toThousands(price) + '円'
  }
}
