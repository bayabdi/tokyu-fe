export const formatCurrency = val => (
  parseInt(val).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
)
