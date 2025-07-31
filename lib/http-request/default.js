const axios = require("axios")
const GetTypeRequest = require("../get-type-request")
const { isDebug } = require("../args")

const debuggingvar = isDebug()

async function DefaultAppRequest(url, { method = "GET", data, headers = {}, ...other } = {}) {
  const defaultHeaders = {
    accept: "*/*",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9",
    "sec-ch-ua": `"Chromium";v="138", "Google Chrome";v="138", "Not=A?Brand";v="99"`,
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
  }
  if(debuggingvar) {
    console.log("[DefaultAppRequest] Default Headers:", defaultHeaders) // Debugging
  }
  try {
    const datarequest = {
      method: method,
      headers: {
        ...defaultHeaders,
        ...headers
      },
      data: data,
      ...other,
      url: new URL(url).href
    }
    if(debuggingvar) {
      console.log("[DefaultAppRequest] Request:", datarequest) // Debugging
    }
    const request = await axios.request(datarequest)
    if(debuggingvar) {
      console.log("[DefaultAppRequest] Request:", request) // Debugging
    }
    const typeReq = GetTypeRequest(request?.headers)
    return {
      isError: false,
      type: typeReq.type,
      isJson: typeReq.isJson,
      isHtml: typeReq.isHtml,
      type: typeReq.type,
      status: request?.status||200,
      headers: request?.headers||{},
      data: request?.data||null,
    }
  } catch(e) {
    console.error("[DefaultAppRequest] ErrorRequest:", e.stack)
    const request = e.response
    const typeReq = GetTypeRequest(request?.headers)
    if(request) {
      return {
        isError: true,
        type: typeReq.type,
        isJson: typeReq.isJson,
        isHtml: typeReq.isHtml,
        status: request?.status||400,
        headers: request?.headers||{},
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

module.exports = DefaultAppRequest