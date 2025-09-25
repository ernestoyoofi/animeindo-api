const mainRequest = {
  default: {
    function: require("./default"),
    desc: "Axios request http"
  },
  'tls-client': {
    function: require("./tls-client"),
    desc: "TLS Client allows you to specify the Client (Browser and Version) you want to use, when requesting a server.\nhttps://github.com/bogdanfinn/tls-client"
  }
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
  const responseExec = await assignRequest.function(url, { ...other })
  return responseExec
}

module.exports = {
  RequestHTTP,
  mainRequest
}