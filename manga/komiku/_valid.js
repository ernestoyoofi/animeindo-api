function isTypeValidation(typeSelect = {}, value = "") {
  const valueUs = String(value||"").trim()
  if(!valueUs) return true // not required
  const chObj = Object.keys(typeSelect)
  if(!chObj.includes(valueUs)) return false // not valid
  return true // valid (required)
}

module.exports = {
  isTypeValidation
}