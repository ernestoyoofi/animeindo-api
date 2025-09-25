const cheerio = require("cheerio")
const _value = require("../_value")
const { RequestHTTP } = require("../../../lib/http-request")

async function Komiku_InfoManga({ httpRequest = "tls-client", slug = "" } = {}) {
  const urlRequest = new URL(`/manga/${slug||""}`, _value.domain.main)
  const request = await RequestHTTP(urlRequest, { request_type: httpRequest })
  if(request.status === 404) {
    return {
      code: 404,
      message: "Komik tidak ditemukan!"
    }
  }
  if(request.status !== 200) {
    return {
      code: 400,
      message: "Respon layanan \"komiku\" buruk, mungkin ada terjadi masalah!"
    }
  }
  if(!request.isHtml) {
    return {
      code: 500,
      message: "Tidak dapat mengambil data!"
    }
  }
  const $ = cheerio.load(request.data)

  let listGenre = []
  $("ul.genre > li").each((i, el) => {
    listGenre.push({
      label: String($(el)?.text()||"")?.trim(),
      slug: String($("a", el)?.attr("href")||"")?.trim()?.split("/")[2]
    })
  })

  let sameRecommend = []
  $("#Spoiler > div").each((i, el) => {
    sameRecommend.push({
      image: String($("img", el)?.attr("data-src")||"").trim(),
      title: String($("div.h4", el)?.text()||"").trim(),
      description: String($("p", el)?.text()||"").trim(),
      slug: String($("a", el).attr("href")||"")?.trim()?.split("/")[2]
    })
  })

  let chapterList = []
  $("#daftarChapter > tr").each((i, el) => {
    if(!String($("td.judulseries", el).text())) {
      return;
    }
    chapterList.push({
      label: String($("td.judulseries > a", el).text()||"")?.trim(),
      slug: String($("td.judulseries > a", el).attr("href")||"")?.trim()?.split("/")[1],
    })
  })

  return {
    data: {
      banner: String($('head > style').text())?.split("url(")[1]?.split(")")[0]||"",
      image: String($("#Informasi > div > img").attr("src"))?.trim(),
      title: String($("#Judul > header > h1 > span")?.text()||"").trim(),
      subtitle: String($("#Judul > header > p")?.text()||"").trim(),
      description: String($("#Judul > p:nth-child(4)").text()||"").trim()?.replace(/  /g, ""),
      synopsis: String($("#Judul > p.desc").text()||"").trim(),
      story_background: String($("#Review > p").text()||"").trim(),
      genre: listGenre,
      same: sameRecommend,
      chapter: chapterList.reverse().map((a, i) => ({ key: i, ...a, }))
    }
  }
}

module.exports = Komiku_InfoManga