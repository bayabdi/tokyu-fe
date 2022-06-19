export const years = function (startYear) {
  let currentYear = new Date().getFullYear(); const years = []
  startYear = startYear || 1980
  while (startYear <= currentYear) {
    years.push(currentYear--)
  }
  return years
}

export const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

export const dates = function (month = new Date().getMonth() /* 1 - 12 */) {
  const d = new Date(new Date().getFullYear(), month, 0)
  const lastDate = d.getDate()
  const allDates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28
  ]
  while (lastDate > allDates[allDates.length - 1]) {
    allDates.push(allDates[allDates.length - 1] + 1)
  }
  return allDates.map(num => (num + '').padStart(2, '0'))
}
