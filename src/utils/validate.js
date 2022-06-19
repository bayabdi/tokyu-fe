export const checkEmail = val => {
  const regex = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(val)
}

export const checkPassword = val => {
  const lower = /[a-z]/.test(val)
  const upper = /[A-Z]/.test(val)
  const symbols = /[-!$%^&*#@()_+|~=`{}\[\]:";'<>?,.\/]/.test(val)
  const numbers = /[0-9]/.test(val)
  return (val?.length >= 8) && [lower, upper, symbols, numbers].filter(t => t).length > 1
}

export const checkNumber = val => {
  const regex = /^[0-9]+$/
  return regex.test(val)
}

export const checkPhoneNumber = val => {
  const regex = /^[0]\d{1,3}[-]?\d{1,4}[-]?\d{3,4}$/
  return regex.test(val)
}

export const checkPostalCode = val => {
  const regex = /^\d{3}-?\d{4}$/
  return regex.test(val)
}

export const checkStringAlphabet = val => {
  const regex = /[A-Za-z]/
  return regex.test(val)
}
