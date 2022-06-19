export const BookingTypeIds = {
  SP: 1,
  FP: 2,
  DP: 3,
  TICKET: 4,
  VS: 5,
  MO: 6,
  VM: 7,
  OTA: 8,
  PW: 9,
  MW: 10,
  OTHER: 11,
  POINT: 12,
  TRIAL: 13
}

export function isBookingTypeAllowedToChange (bookingTypeId) {
  return [
    BookingTypeIds.SP,
    BookingTypeIds.FP,
    BookingTypeIds.DP,
    BookingTypeIds.VS,
    BookingTypeIds.MO,
    BookingTypeIds.VM,
    BookingTypeIds.PW,
    BookingTypeIds.MW
  ].includes(bookingTypeId)
}

export function isBookingTypeFixedRight (bookingTypeId) {
  return [
    BookingTypeIds.PW,
    BookingTypeIds.MW,
    BookingTypeIds.VM
  ].includes(bookingTypeId)
}
