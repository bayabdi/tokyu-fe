import { i18n } from '@/plugins/i18n'

export const getDayText = (d) => {
  switch (d) {
    case 0:
      return i18n.t('daysOfWeek.sun')
    case 1:
      return i18n.t('daysOfWeek.mon')
    case 2:
      return i18n.t('daysOfWeek.tue')
    case 3:
      return i18n.t('daysOfWeek.wed')
    case 4:
      return i18n.t('daysOfWeek.thu')
    case 5:
      return i18n.t('daysOfWeek.fri')
    case 6:
      return i18n.t('daysOfWeek.sat')
  }
  // Intl.DateTimeFormat -.-
}

export const getDaysInMonth = (maxDay) => {
  const dayList = []
  for (let i = 0; i < maxDay; i++) {
    dayList.push(i + 1)
  }
  return dayList
}

export const getYearListOfAge = (minAge = 0) => {
  const yearList = []
  const start = 1900
  const end = new Date().getFullYear()
  for (let year = start; year <= end - minAge; year++) {
    yearList.push(year)
  }
  yearList.sort((a, b) => b - a)
  return yearList
}

export const jaShortDate = (date) => {
  date = new Date(date)
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

export const jaShortDateWithDow = (date) => {
  date = new Date(date)
  return `${date.getMonth() + 1}/${date.getDate()} (${getDayText(date.getDay())})`
}

function zPad (num) {
  return `${num}`.padStart(2, '0')
}

export function delimitedDateString (
  date,
  delimiter
) {
  return `${date.getFullYear()}${delimiter}${zPad(
    date.getMonth() + 1
  )}${delimiter}${zPad(date.getDate())}`
}

export const isoDate = (date) => {
  return delimitedDateString(date, '-')
}

export const createIsoDate = (year, month, date) => {
  return isoDate(new Date(year, month - 1, date))
}

export const getNumberOfDaysBetween = (fromDate, toDate) => {
  fromDate = new Date(fromDate)
  toDate = new Date(toDate)
  const diffTime = Math.abs(toDate - fromDate)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export const jaLongDate = (date) => {
  date = new Date(date)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日(${getDayText(date.getDay())})`
}

export const jaLongDateSlash = (date) => {
  date = new Date(date)
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} (${getDayText(date.getDay())})`
}

export const jaShortDateSlash = (date) => {
  date = new Date(date)
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

export const jaLongDateRange = (fromDate, toDate) => {
  return `${jaLongDate(fromDate)} ~ ${jaLongDate(toDate)}`
}

export const addDays = (date, n) => {
  const dateObj = new Date(date)
  dateObj.setDate(dateObj.getDate() + n)

  if (typeof date === 'string') return isoDate(dateObj)
  return dateObj
}

export function getDateRangeArray (startDate, endDate, {
  excludeLast
} = {
  excludeLast: false
}) {
  startDate = new Date(startDate)
  endDate = new Date(endDate)

  const dates = []
  const currentDate = startDate

  // eslint-disable-next-line no-unmodified-loop-condition
  while (currentDate < endDate || (currentDate.getTime() === endDate.getTime() && !excludeLast)) {
    dates.push(isoDate(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}

export function getStayDateRangeArray (checkInDate, checkOutDate) {
  return getDateRangeArray(checkInDate, checkOutDate, { excludeLast: true })
}

export function getNowPlusOne () {
  return new Date(Date.now() + (3600 * 1000 * 24))
}
