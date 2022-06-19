import { BookingTypeIds } from '@/constants/booking-type'

/**
 *
 * @param data
 * @param data.bookingTypeId
 * @param data.stayConfirmedAt
 * @returns {boolean}
 */
export function confirmationCheck (data) {
  if (data.bookingTypeId === BookingTypeIds.MW || data.bookingTypeId === BookingTypeIds.VM || data.bookingTypeId === BookingTypeIds.PW) {
    return data.stayConfirmedAt === null
  } else {
    return false
  }
}

/**
 *
 * @param data
 * @param data.bookingTypeId
 * @param data.stayConfirmedAt
 * @returns {boolean}
 */
export function confirmationCheckMwDpFpSpPw (data) {
  if (
    data.bookingTypeId === BookingTypeIds.MW || data.bookingTypeId === BookingTypeIds.DP ||
    data.bookingTypeId === BookingTypeIds.FP || data.bookingTypeId === BookingTypeIds.SP ||
    data.bookingTypeId === BookingTypeIds.PW
  ) {
    return data.stayConfirmedAt == null
  } else {
    return false
  }
}
