const { createTLSClient } = require("tls-client-node")
const GetTypeRequest = require("../get-type-request")
const httpLowerKeyRespon = require("../http-lowerkey-respon")
const { isDebug } = require("../args")

const axios = createTLSClient()
const debuggingvar = isDebug()

async function TlsClient(url, { method = "GET", data, headers = {}, ...other } = {}) {
  try {
    const datarequest = {
      method: method,
      headers: {
        ...headers
      },
      data: data,
      ...other,
      url: new URL(url).href
    }
    if(debuggingvar) {
      console.log("[TlsClient] Request:", datarequest) // Debugging
    }
    const request = await axios.request(datarequest)
    if(debuggingvar) {
      console.log("[TlsClient] Request:", request) // Debugging
    }
    const headersRes = httpLowerKeyRespon(request?.headers||{})
    const typeReq = GetTypeRequest(headersRes)
    return {
      isError: false,
      type: typeReq.type,
      isJson: typeReq.isJson,
      isHtml: typeReq.isHtml,
      type: typeReq.type,
      status: request?.status||200,
      headers: headersRes||{},
      data: request?.data||null,
    }
  } catch(e) {
    console.error("[TlsClient] ErrorRequest:", e.stack)
    const request = e.response
    const headersRes = httpLowerKeyRespon(request?.headers||{})
    // Redirect
    if(request.status > 300 && request.status < 399 && !!headersRes['location']) {
      return await TlsClient(headersRes['location']) // Redirect
    }
    const typeReq = GetTypeRequest(headersRes)
    if(request) {
      return {
        isError: true,
        type: typeReq.type,
        isJson: typeReq.isJson,
        isHtml: typeReq.isHtml,
        status: request?.status||400,
        headers: headersRes||{},
        data: request?.data||null,
      }
    }
    return {
      isError: true,
      isJson: false,
      isHtml: false,
      type: "txt",
      status: -1500,
      headers: {},
      data: null
    }
  }
}

module.exports = TlsClient