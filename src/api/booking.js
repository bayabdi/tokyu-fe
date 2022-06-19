import { apolloClient } from '@/plugins/apollo'
import { GET_CANCEL_POLICY } from './graphql/new-booking'

export async function getCancelPolicyBeforeBook (
  contractId,
  checkInDate,
  bookingPlanId
) {
  const res = await apolloClient.query({
    query: GET_CANCEL_POLICY,
    variables: {
      contractId,
      checkInDate,
      bookingPlanId
    }
  })

  return res.data.myCancelPolicy
}

export async function getBookingCancelPolicy (bookingId, code) {
  const res = await apolloClient.query({
    query: GET_CANCEL_POLICY,
    variables: {
      bookingId,
      code
    }
  })

  return res.data.bookingCancelPolicy
}

export function flattenRentalItemRequest (rentalItems) {
  return rentalItems.reduce((arr, rentalGroup) => {
    rentalGroup.selects.forEach(item => {
      arr.push({
        rentalItemId: item.rentalItemId ?? item.id,
        fromDate: rentalGroup.fromDate,
        toDate: rentalGroup.toDate,
        quantity: item.quantity
      })
    })
    return arr
  }, [])
}
export function flattenRentalParkingRequest (parkings, forUpdate = false) {
  return parkings.map((parking) => {
    return {
      ...(forUpdate ? { id: parking.id } : {}),
      [forUpdate ? 'facilityParkingId' : 'parkingId']: parking.parking.id,
      fromDate: parking.fromDate,
      toDate: parking.toDate,
      height: parking.height,
      carNumber: parking.carNumber,
      color: parking.color,
      toWaitList: parking.parking.waitlist
    }
  })
}
