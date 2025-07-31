const cheerio = require("cheerio")
const _value = require("../_value")
const RequestHTTP = require("../../../lib/http-request")

async function Komiku_Beranda({ httpRequest = "tls-client" } = {}) {
  const urlRequest = new URL(_value.domain.main)
  const request = await RequestHTTP(urlRequest, { request_type: httpRequest })
  if(request.status !== 200) {
    return {
      status: 400,
      message: "Respon layanan \"komiku\" buruk, mungkin ada terjadi masalah!"
    }
  }
  if(!request.isHtml) {
    return {
      status: 500,
      message: "Tidak dapat mengambil data!"
    }
  }
  const $ = cheerio.load(request.data)
  // # Peringkat
  let rankingKomiku = []
  $("article", $("#Rekomendasi_Komik > div > div > div").eq(0)).each((i, el) => {
    const dataInsert = {
      rank: `#${Number(i)+1}`,
      image: String($("img", el)?.attr("data-src")).trim(),
      title: String($(".ls2j h3", el).eq(0)?.text()).trim(),
      type: String($("div.ls2j > span", el)?.text()).trim(),
      slug: String($("div.ls2j > h3 > a", el)?.attr("href"))?.trim()?.split("/")[2],
    }
    rankingKomiku.push(dataInsert)
  })
  // # Baca Manga Populer
  let populerManga = []
  $("article", $("#Komik_Hot_Manga > div > div.ls112 > div").eq(0)).each((i, el) => {
    const dataInsert = {
      image: String($("img", el)?.attr("data-src")).trim(),
      title: String($(".ls2j h3", el).eq(0)?.text()).trim(),
      type: String($("div.ls2j > span", el)?.text()).trim()?.split("  ")[0]?.split(" • ")[0],
      slug: String($("div.ls2j > h3 > a", el)?.attr("href"))?.trim()?.split("/")[2],
    }
    populerManga.push(dataInsert)
  })
  // # Baca Manhwa Populer
  let populerManhwa = []
  $("article", $("#Komik_Hot_Manhwa > div > div.ls112 > div").eq(0)).each((i, el) => {
    const dataInsert = {
      image: String($("img", el)?.attr("data-src")).trim(),
      title: String($(".ls2j h3", el).eq(0)?.text()).trim(),
      type: String($("div.ls2j > span", el)?.text()).trim()?.split("  ")[0]?.split(" • ")[0],
      slug: String($("div.ls2j > h3 > a", el)?.attr("href"))?.trim()?.split("/")[2],
    }
    populerManhwa.push(dataInsert)
  })
  // # Baca Manhua Populer
  let populerManhua = []
  $("article", $("#Komik_Hot_Manhua > div > div.ls112 > div").eq(0)).each((i, el) => {
    const dataInsert = {
      image: String($("img", el)?.attr("data-src")).trim(),
      title: String($(".ls2j h3", el).eq(0)?.text()).trim(),
      type: String($("div.ls2j > span", el)?.text()).trim()?.split("  ")[0]?.split(" • ")[0],
      slug: String($("div.ls2j > h3 > a", el)?.attr("href"))?.trim()?.split("/")[2],
    }
    populerManhua.push(dataInsert)
  })
  // # Baca Komik Terbaru
  let newComic = []
  $("#Terbaru > div.ls4w > article").each((i, el) => {
    const dataInsert = {
      image: String($("img", el).attr("data-src")).trim(),
      title: String($("h3", el).text()).trim(),
      type: String($("span.ls4s", el).text()).trim()?.split("  ")[0]?.split(" • ")[0],
      slug: String($("a", el)?.attr("href"))?.trim()?.split("/")[2],
    }
    newComic.push(dataInsert)
  })
  // # Genre
  let genreList = []
  $("#genr > ul > li").each((i, el) => {
    genreList.push({
      label: String($("a", el)?.text()||"").trim(),
      slug: String($("a", el).attr("href"))?.split("/")[2]
    })
  })

  return {
    data: {
      ranking: rankingKomiku,
      populer: {
        manga: populerManga,
        manhwa: populerManhwa,
        manhua: populerManhua
      },
      new: newComic,
    },
    attr: {
      genre: genreList
    }
  }
}

module.exports = Komiku_Beranda