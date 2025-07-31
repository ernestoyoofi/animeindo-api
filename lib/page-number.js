function PageNumbered(num = 0) {
  if(num > 0) {
    return `/${num+1}`
  }
  return '/'
}

module.exports = PageNumbered