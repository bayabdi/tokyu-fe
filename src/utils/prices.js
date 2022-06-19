import { getNumberOfDaysBetween } from './get-date'

export function summarizePricesByDate (pricesByDays) {
  const feeBySubject = {}

  if (!pricesByDays || pricesByDays.length === 0) return []
  pricesByDays.forEach(pricesByDay => pricesByDay.forEach(priceOfDay => priceOfDay.fees.forEach(
    ({
      subject,
      priceWithSalesTax
    }) => {
      if (!feeBySubject[subject]) feeBySubject[subject] = priceWithSalesTax
      else feeBySubject[subject] += priceWithSalesTax
    }
  )))

  return Object.keys(feeBySubject).map(subject => {
    return {
      subject,
      price: feeBySubject[subject]
    }
  })
}

export function calculateRentalItemPrice (rentalItemGroups) {
  if (!rentalItemGroups || rentalItemGroups.length === 0) {
    return {
      totalPrice: 0,
      charges: []
    }
  }

  let totalPrice = 0
  const pricePerItem = {}

  rentalItemGroups.forEach(rentalItemGroup => {
    if (!rentalItemGroup.fromDate || !rentalItemGroup.toDate) {
      // the range is not complete. cannot calculate
      throw new Error('日程を選択して下さい')
    }
    const days = getNumberOfDaysBetween(rentalItemGroup.fromDate, rentalItemGroup.toDate)

    rentalItemGroup.selects?.forEach(rentalItem => {
      const qty = rentalItem.quantity
      const price = rentalItem.rentalItemDef.priceWithSalesTax
      let priceForStay
      if (rentalItem.rentalItemDef.rentalPeriod === 'Stay') {
        priceForStay = qty * price
      } else {
        priceForStay = qty * price * days
      }

      totalPrice += priceForStay
      if (!pricePerItem[rentalItem.id]) {
        pricePerItem[rentalItem.id] = {
          id: rentalItem.id,
          name: rentalItem.rentalItemDef.name,
          price: priceForStay
        }
      } else {
        pricePerItem[rentalItem.id].price += priceForStay
      }
    })
  })

  const itemCharges = Object.keys(pricePerItem).map(id => {
    return {
      rentalItemId: id,
      name: pricePerItem[id].name,
      price: pricePerItem[id].price
    }
  })

  return {
    totalPrice,
    charges: itemCharges
  }
}
