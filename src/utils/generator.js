export const numberArrayGenerator = (max, withoutZero = true) => {
  const array = Array.from(Array(max + 1).keys())
  return withoutZero ? array.slice(1) : array
}
