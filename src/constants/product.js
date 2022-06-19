export const ProductTypeNameToId = {
  MW: 1,
  SP: 2,
  FP: 3,
  VS: 4,
  VM: 5,
  PW: 6
}

export const ProductTypeId = {
  [ProductTypeNameToId.MW]: { name: 'マイウィーク', nameEn: 'MY WEEK', newBookingName: 'デイプラン' },
  [ProductTypeNameToId.SP]: { name: 'シェアリングポイント', nameEn: 'SHARING POINT', newBookingName: 'シェアリングポイント' },
  [ProductTypeNameToId.FP]: { name: 'フレックスポイント', nameEn: 'FLEX POINT', newBookingName: 'フレックスポイント' },
  [ProductTypeNameToId.VS]: { name: 'バケーションスタイル', nameEn: 'VACATION STYLE', newBookingName: 'バケーションスタイル' },
  [ProductTypeNameToId.VM]: { name: 'バケーションマスター', nameEn: 'VACATION MASTER', newBookingName: 'マスターズオプション' },
  [ProductTypeNameToId.PW]: { name: 'プライムウィーク', nameEn: 'PRIME WEEK', newBookingName: '' }
}

export function getNameOfProduct (productTypeId) {
  return ProductTypeId[productTypeId].name
}

export function contractIsForNewBooking (productTypeId) {
  productTypeId = parseInt(productTypeId, 10)
  return !!(ProductTypeId[productTypeId]?.newBookingName)
}

export function isPointBasedProduct (productTypeId) {
  return productTypeId === ProductTypeNameToId.SP || productTypeId === ProductTypeNameToId.FP
}

export function isTvpPaymentAllowedProduct (productTypeId) {
  return productTypeId === ProductTypeNameToId.VM || productTypeId === ProductTypeNameToId.VS
}

export function getPointName (productTypeId) {
  switch (productTypeId) {
    case ProductTypeNameToId.SP: return 'シェアリングポイント'
    case ProductTypeNameToId.FP: return 'フレックスポイント'
    default: return ''
  }
}

export function canUseTvp (productTypeId) {
  return [
    ProductTypeNameToId.VS, ProductTypeNameToId.VM
  ].includes(productTypeId)
}
