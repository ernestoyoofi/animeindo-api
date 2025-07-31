const _value = require("../_value")
const _valid = require("../_valid")
const RequestHTTP = require("../../../lib/http-request")
const PageNumber = require("../../../lib/page-number")
const ListingCardScrap = require("../_listing-card-scrap")

async function Komiku_Pencarian({ httpRequest = "tls-client", data = {
  search: "",
  page: 0
} } = {}) {
  // Validate only interger
  if(!!String(data.page).split(".")[1]) {
    return {
      status: 400,
      message: "Halaman hanya bersifat interger!"
    }
  }
  // Build URL
  const numberPg = PageNumber(data.page).length > 1? `/page${PageNumber(data.page)}`:"/"
  console.log(numberPg)
  const buildQuery = new URLSearchParams({
    post_type: String(_value.form_type[data?.orderby]||"manga").trim(),
    s: String(data.search||""),
  }).toString()
  const urlRequest = new URL(`${numberPg}?${buildQuery}`, _value.domain.api)
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

  const list = ListingCardScrap(request.data)

  return {
    data: {
      message: String(data.search||"").length < 1? "Silahkan masukan parameter ?search={{SEARCH_TEXT}} untuk mencari data":undefined,
      is_next: !!String(request.data||"")?.match(`<span hx-get="https://api.komiku.org/manga/page`),
      next_page_is: data.page+1,
      list: list,
    }
  }
}

module.exports = Komiku_Pencarian