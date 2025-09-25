const express = require("express")
const cors = require("cors")
const json2xml = require("json2xml")
const routeinfo = require("./routeinfo")
const scrappingLib = require("./lib/http-request")
const apppackage = require("./package.json")

const app = express()
const port = process.env.PORT || 3200

app.use(cors())
app.use((req, res, next) => {
  res.setHeader("x-powered-by", "")
  res.setHeader("x-version-app", String(apppackage.version))
  res.setHeader("x-home-app", String(apppackage.homepage))
  res.setHeader("x-report-app", String(apppackage.bugs.url))
  res.setRespon = (data = {}, status = 200) => {
    const contentType = (req.headers.accept||"application/json").split("/")[1].split(";")[0].trim()
    const dataRespon = status > 399? { error: data }:data
    if(contentType === "xml") {
      const toxml = json2xml(dataRespon)
      res.header("Content-Type", "application/xml")
      return res.status(status).send(`<?xml version="1.0" encoding="UTF-8"?>${toxml}`)
    } else {
      return res.status(status).json(dataRespon)
    }
  }
  next()
})

// Routeing
const KomikuRoute = require("./router/komiku")
app.use("/api/komiku", KomikuRoute)

app.use("/", (req, res) => {
  console.log(req)
  const hostGlobal = req.headers.host
  res.setRespon({
    data: {
      docs: String(apppackage.homepage),
      list_http_request: Object.keys(scrappingLib.mainRequest).map(key => ({
        key: key,
        label: scrappingLib.mainRequest[key].desc||""
      })),
      route_api: {
        komiku: routeinfo(KomikuRoute, "/api/komiku", hostGlobal)
      }
    }
  })
})

app.use((req, res) => {
  res.setRespon({
    code: 404,
    message: "(API) Halaman tidak ditemukan!",
    docs: String(apppackage.homepage)
  }, 404)
})

app.use((err, req, res, next) => {
  console.error("[Error Global Debugging]:", err)
  res.setRespon({
    code: 500,
    message: "Internal server error"
  }, 500)
})

app.listen(port, () => {
  console.log(`Run on http://localhost:${port}`)
})
