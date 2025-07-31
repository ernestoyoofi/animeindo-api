function GetTypeRequest(headers) {
  const header = (typeof headers === "object" && !Array.isArray(headers))? headers:{}
  const typeContent = header['content-type']
  const onlytype = typeContent.split(";")[0]
  const spliting = onlytype.split("/")

  return {
    type: String(spliting[1]).trim(),
    response: String(spliting[0]).trim(),
    isJson: String(spliting[1]).trim() === "json",
    isHtml: String(spliting[1]).trim() === "html",
  }
}

module.exports = GetTypeRequest