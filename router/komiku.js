const Komiku_BacaManga = require("../manga/komiku/scrap/baca")
const Komiku_Beranda = require("../manga/komiku/scrap/beranda")
const Komiku_Genre = require("../manga/komiku/scrap/genre")
const Komiku_InfoManga = require("../manga/komiku/scrap/info")
const Komiku_Pencarian = require("../manga/komiku/scrap/pencarian")
const Komiku_Pustaka = require("../manga/komiku/scrap/pustaka")

const route = require("express").Router()

// ----------- Beranda -----------
route.get("/", async (req, res) => {
  const requestData = await Komiku_Beranda({ httpRequest: req.params.request })
  return res.setRespon(requestData||{}, requestData?.code||200)
})

route.get("/info/:slug", async (req, res) => {
  const requestData = await Komiku_InfoManga({
    httpRequest: req.query?.request||undefined, slug: (req.params?.slug||"")
  })
  return res.setRespon(requestData||{}, requestData?.code||200)
})

route.get("/baca/:slug/", async (req, res) => {
  const requestData = await Komiku_BacaManga({
    httpRequest: req.query?.request||undefined, slug: (req.params?.slug||""),
    chapterIndex: 0
  })
  return res.setRespon(requestData||{}, requestData?.code||200)
})
route.get("/baca/:slug/:index", async (req, res) => {
  const requestData = await Komiku_BacaManga({
    httpRequest: req.query?.request||undefined, slug: (req.params?.slug||""),
    chapterIndex: Number(req.params?.slug)||0
  })
  return res.setRespon(requestData||{}, requestData?.code||200)
})

// ----------- Pencarian -----------
route.get("/pencarian", async (req, res) => {
  const requestData = await Komiku_Pencarian({
    httpRequest: req.query?.request||undefined,
    data: { ...req.query, page: 0 },
  })
  return res.setRespon(requestData||{}, requestData?.code||200)
})
route.get("/pencarian/:page", async (req, res) => {
  const paddingPage = Number(req.params?.page)
  if(paddingPage < 1) {
    return res.redirect(`${req.baseUrl}/pencarian`) // Redirect
  }
  const requestData = await Komiku_Pencarian({
    httpRequest: req.query?.request||undefined,
    data: { ...req.query, page: paddingPage||0 },
  })
  return res.setRespon(requestData||{}, requestData?.code||200)
})
route.get("/search", async (req, res) => {
  const requestData = await Komiku_Pencarian({
    httpRequest: req.query?.request||undefined,
    data: { ...req.query, page: 0 },
  })
  return res.setRespon(requestData||{}, requestData?.code||200)
})
route.get("/search/:page", async (req, res) => {
  const paddingPage = Number(req.params?.page)
  if(paddingPage < 1) {
    return res.redirect(`${req.baseUrl}/search`) // Redirect
  }
  const requestData = await Komiku_Pencarian({
    httpRequest: req.query?.request||undefined,
    data: { ...req.query, page: paddingPage||0 },
  })
  return res.setRespon(requestData||{}, requestData?.code||200)
})

// ----------- Genre -----------
route.get("/genre/:genre", async (req, res) => {
  const requestData = await Komiku_Genre({
    httpRequest: req.query?.request||undefined,
    data: { ...req.query, genre: (req.params?.genre||""), page: 0 },
  })
  return res.setRespon(requestData||{}, requestData?.code||200)
})
route.get("/genre/:genre/:page", async (req, res) => {
  const paddingPage = Number(req.params?.page)
  if(paddingPage < 1) {
    return res.redirect(`${req.baseUrl}/genre/${req.params.genre}`) // Redirect
  }
  const requestData = await Komiku_Genre({
    httpRequest: req.query?.request||undefined,
    data: { ...req.query, genre: (req.params?.genre||""), page: paddingPage||0 },
  })
  return res.setRespon(requestData||{}, requestData?.code||200)
})

// ----------- Pustaka -----------
route.get("/pustaka", async (req, res) => {
  const requestData = await Komiku_Pustaka({
    httpRequest: req.query?.request||undefined,
    data: { ...req.query, page: 0 },
  })
  return res.setRespon(requestData||{}, requestData?.code||200)
})
route.get("/pustaka/:page", async (req, res) => {
  const paddingPage = Number(req.params?.page)
  if(paddingPage < 1) {
    return res.redirect(`${req.baseUrl}/pustaka`) // Redirect
  }
  const requestData = await Komiku_Pustaka({
    httpRequest: req.query?.request||undefined,
    data: { ...req.query, page: paddingPage||0 },
  })
  return res.setRespon(requestData||{}, requestData?.code||200)
})

// ----------- Manhwa -----------
route.get("/manhwa", async (req, res) => {
  const requestData = await Komiku_Pustaka({
    httpRequest: req.query?.request||undefined,
    data: { ...req.query, type: "manhwa", page: 0 },
  })
  return res.setRespon(requestData||{}, requestData?.code||200)
})
route.get("/manhwa/:page", async (req, res) => {
  const paddingPage = Number(req.params?.page)
  if(paddingPage < 1) {
    return res.redirect(`${req.baseUrl}/manhwa`) // Redirect
  }
  const requestData = await Komiku_Pustaka({
    httpRequest: req.query?.request||undefined,
    data: { ...req.query, type: "manhwa", page: paddingPage||0 },
  })
  return res.setRespon(requestData||{}, requestData?.code||200)
})

// ----------- Manhua -----------
route.get("/manhua", async (req, res) => {
  const requestData = await Komiku_Pustaka({
    httpRequest: req.query?.request||undefined,
    data: { ...req.query, type: "manhua", page: 0 },
  })
  return res.setRespon(requestData||{}, requestData?.code||200)
})
route.get("/manhua/:page", async (req, res) => {
  const paddingPage = Number(req.params?.page)
  if(paddingPage < 1) {
    return res.redirect(`${req.baseUrl}/manhua`) // Redirect
  }
  const requestData = await Komiku_Pustaka({
    httpRequest: req.query?.request||undefined,
    data: { ...req.query, type: "manhua", page: paddingPage||0 },
  })
  return res.setRespon(requestData||{}, requestData?.code||200)
})

module.exports = route