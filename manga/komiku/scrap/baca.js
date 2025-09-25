const cheerio = require("cheerio")
const _value = require("../_value")
const { RequestHTTP } = require("../../../lib/http-request")
const Komiku_InfoManga = require("./info")

async function Komiku_BacaManga({ httpRequest = "tls-client", slug = "", chapterIndex = 0 } = {}) {
  const getList = await Komiku_InfoManga({ httpRequest: httpRequest, slug: slug })
  if(getList.code && getList.message) {
    return getList
  }
  const readableLink = getList.data.chapter.find(a => a.key === chapterIndex)
  if(!readableLink) {
    return {
      code: 404,
      message: "Halaman tidak ditemukan!"
    }
  }
  const urlRequest = new URL(readableLink.slug, _value.domain.main)
  const request = await RequestHTTP(urlRequest, { httpRequest: httpRequest })
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

  let listImg = []
  $("#Baca_Komik > img").each((i, el) => {
    listImg.push($(el).attr("src"))
  })

  return {
    data: {
      isLast: !getList.data.chapter.find(a => a.key+1 === chapterIndex), // Unlogic from web!
      list: listImg
    }
  }
}

module.exports = Komiku_BacaManga