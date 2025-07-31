const domain = {
  main: "https://komiku.org",
  api: "https://api.komiku.org"
}

const form_orderby = {
  new: "date",
  modified: "modified",
  rank: "meta_value_num",
  random: "rand"
}
const form_type = {
  manga: "manga",
  manhua: "manhua",
  manhwa: "manhwa",
}
const form_status = {
  ongoing: "ongoing",
  end: "end",
  finis: "end",
}

module.exports = {
  domain,
  form_orderby,
  form_type,
  form_status,
}