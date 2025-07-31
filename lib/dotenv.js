require("dotenv").config({
  debug: false,
  quiet: true
})

module.exports = {
  proxy_http: String(process.env.PROXY_HTTP||"")
    .split(", ")
    .map(a => a.trim())
    .filter(a => (a.startsWith("http://") || a.startsWith("https://"))),
  
}