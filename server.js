const express = require("express")
const cors = require("cors")
const json2xml = require("json2xml")

const app = express()
const port = process.env.PORT || 3200

app.use(cors())
app.use((req, res, next) => {
  res.setRespon = (data = {}, status = 200) => {
    const contentType = (req.headers.accept||"application/json").split("/")[1].split(";")[0].trim()
    if(contentType === "xml") {
      const toxml = json2xml(data)
      res.header("Content-Type", "application/xml")
      return res.status(status).send(`<?xml version="1.0" encoding="UTF-8"?>${toxml}`)
    } else {
      return res.status(status).json(data)
    }
  }
  next()
})

const KomikuRoute = require("./router/komiku")
app.use("/api/komiku", KomikuRoute)

app.use((req, res) => {
  res.setRespon({
    status: 404,
    message: "(API) Halaman tidak ditemukan!",
    docs: "https://github.com/ernestoyoofi/mangaindo-api#undefined"
  }, 404)
})

app.listen(port, () => {
  console.log(`Run on http://localhost:${port}`)
})
