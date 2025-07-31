const cheerio = require("cheerio")

function ListingCardScrap(data) {
  const $ = cheerio.load(data)

  let listCard = []
  $("div.bge").each((i, el) => {
    const typeReadingView = String($("div.kan > span", el).text()).trim()
    const updateContext = String(typeReadingView.split("•")[1]?.trim()?.split("lalu")[0]||"")
    const descriptionText = String($("div.kan > p", el).text())?.trim()
    const linkHref = String($(".bgei > a", el)?.attr("href")||"")?.trim()
    const dataInsert = {
      image: String($("div.bgei > a > img", el).attr("src"))?.trim(),
      title: String($("div.kan > a > h3", el).text())?.trim(),
      description: descriptionText.match("Update ")? undefined : descriptionText,
      view: typeReadingView.split("•")[0]?.trim()||undefined,
      update: updateContext? updateContext+"lalu" : descriptionText.match("Update ")? descriptionText : undefined,
      slug: linkHref.match("https://")? linkHref?.split("/")[4] : linkHref?.split("/")[2]
    }
    listCard.push(dataInsert)
  })

  return listCard
}

module.exports = ListingCardScrap