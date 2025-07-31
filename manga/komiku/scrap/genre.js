const _value = require("../_value")
const _valid = require("../_valid")
const RequestHTTP = require("../../../lib/http-request")
const PageNumber = require("../../../lib/page-number")
const ListingCardScrap = require("../_listing-card-scrap")

async function Komiku_Genre({ httpRequest = "tls-client", data = {
  orderby: "",
  type: "",
  genre: "",
  page: 0
} } = {}) {
  // Validate only interger
  if(!!String(data.page).split(".")[1]) {
    return {
      status: 400,
      message: "Halaman hanya bersifat interger!"
    }
  }
  // Validate Text
  if(String(data?.genre||"").length < 2 || typeof data?.genre !== "string") {
    return {
      status: 400,
      message: "Genre harus diisi minimal 2 dengan format text!"
    }
  }
  // Validate orderby
  if(!_valid.isTypeValidation(_value.form_orderby, data.orderby)) {
    return {
      status: 400,
      message: `Urutan filter hanya bisa di isi ${Object.keys(_value.form_orderby)}`
    }
  }
  // Validate type
  if(!_valid.isTypeValidation(_value.form_type, data.type)) {
    return {
      status: 400,
      message: `Tipe filter hanya bisa di isi ${Object.keys(_value.form_type)}`
    }
  }
  // Build URL
  const numberPg = PageNumber(data.page).length > 1? `/page${PageNumber(data.page)}`:"/"
  console.log(numberPg)
  const buildQuery = new URLSearchParams({
    orderby: String(_value.form_orderby[data?.orderby]||"").trim(),
    tipe: String(_value.form_type[data?.type]||""),
  }).toString()
  const urlRequest = new URL(`/genre/${data?.genre||""}${numberPg}?${buildQuery}`, _value.domain.api)
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
      is_next: !!String(request.data||"")?.match(`<span hx-get="https://api.komiku.org/manga/page`),
      next_page_is: data.page+1,
      list: list,
    }
  }
}

module.exports = Komiku_Genre