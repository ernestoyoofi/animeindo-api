const mainRequest = {
  default: require("./default"),
  'tls-client': require("./tls-client")
}

async function RequestHTTP(url, { request_type = "default", ...other } = {}) {
  const assignRequest = mainRequest[request_type]
  if(!assignRequest) {
    return {
      isError: true,
      isJson: false,
      isHtml: false,
      type: "txt",
      status: -1200,
      headers: {},
      data: null
    }
  }
  const responseExec = await assignRequest(url, { ...other })
  return responseExec
}

module.exports = RequestHTTP