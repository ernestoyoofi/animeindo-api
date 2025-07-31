function httpLowerKeyRespon(headers) {
  const lowerCaseHeaders = {}
  for(const key in headers) {
    if(Object.prototype.hasOwnProperty.call(headers, key)) {
      lowerCaseHeaders[key.toLowerCase()] = headers[key]
    }
  }
  return lowerCaseHeaders
}

module.exports = httpLowerKeyRespon