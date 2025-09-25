# AnimeIndo API

[![GitHub stars](https://img.shields.io/github/stars/ernestoyoofi/animeindo-api?style=social)](https://github.com/ernestoyoofi/animeindo-api/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/ernestoyoofi/animeindo-api?style=social)](https://github.com/ernestoyoofi/animeindo-api/network/members)
[![GitHub license](https://img.shields.io/github/license/ernestoyoofi/animeindo-api)](https://github.com/ernestoyoofi/animeindo-api/blob/main/LICENSE)

OpenAPI yang berfungsi sebagai jembatan untuk mendapatkan data dari situs-situs manga atau anime Indonesia dalam format json.

> [!IMPORTANT]
> Jika kamu menggunakan API ini, API ini memiliki limitasi / batas permintaan, yaitu 15x / 120s, jadi jika ingin menggunakan lebih, silahkan deploy pada hosting milik sendiri.

## ✨ Situs yang discrapping

> [!IMPORTANT]
> Halaman API ini belum memiliki dokumentasi.

Untuk API gunakan url bawaannya `https://[hosts]/api/[services...]`

**API Hosting:**

- [animeindoapi.vercel.app](https://animeindoapi.vercel.app) (API Utama, Limitasi 15x/120s)
- [animeindoapi-sv2.vercel.app](https://animeindoapi-sv2.vercel.app) (Secondary, Limitasi 30x/120s)
- [animeindoapi.nakikoneko.workers.dev](https://animeindoapi.nakikoneko.workers.dev) (_Tidak tersedia saat ini_)

**Sevices/Layanan:**

- [Komiku (/api/komiku)](https://animeindoapi.vercel.app/api/komiku) | [Function](./manga/komiku/) | [Route](./router/komiku.js)
  - `/api/komiku/` > Beranda
  - `/api/komiku/info/:slug` > Detail Komik
  - `/api/komiku/baca/:slug` > Halaman Baca
  - `/api/komiku/baca/:slug/:index` > Halaman Baca (dengan indek)
  - `/api/komiku/pencarian?search={{PARAMS}}` > Pencarian
  - `/api/komiku/pencarian/:page?search={{PARAMS}}` > Pencarian (dengan indek)
  - `/api/komiku/search?search={{PARAMS}}` > Pencarian
  - `/api/komiku/search/:page?search={{PARAMS}}` > Pencarian (dengan indek)
  - `/api/komiku/genre/:genre` > Genre
  - `/api/komiku/genre/:genre/:page` > Genre (dengan indek)
  - `/api/komiku/pustaka/` > Pustaka
  - `/api/komiku/pustaka/:page` > Pustaka (dengan indek)
  - `/api/komiku/manhwa/` > Manhwa / Komik
  - `/api/komiku/manhwa/:page` > Manhwa / Komik (dengan indek)
  - `/api/komiku/manhua/` > Manhua / Komik
  - `/api/komiku/manhua/:page` > Manhua / Komik (dengan indek)

- [Komikcast (/api/komikcast)](https://animeindoapi.vercel.app/api/komikcast) | [Function](./manga/komikcast/) | [Route](./router/komikcast.js)
- [Maid / Maga Indonesia (/api/maid)](https://animeindoapi.vercel.app/api/maid) | [Function](./manga/maid/) | [Route](./router/maid.js)

## 📚 Header / Query Permintaan Layanan (Opsional)

Jika terjadi masalah atau memerlukan akses pihak ketiga agar dapat menyelesaikan masalahnya, silahkan gunakan opsi dibawah ini.

| Header Request | Query Request | Value / Nilai | Deskripsi/Penjelasan |
| -----  | ----- | ----- | -------------------- |
| `x-http-request` | `request` | `default`,`tls-client`,`proxy-default`,`proxy` (proxy hanya bisa pada headers) | Digunakan pada metode permintaan data atau dalam scrapping data, sehingga data dapat diberikan tanpa adanya batasan, biasanya akan di atur pada `tls-client` |

## ✋ Disclaimer

Project ini tidak afiliasi atau berhubungan dengan orisinil, jika terjadi masalah atau project ini secara tiba tiba menghilang atau diminta untuk _shutdown_ bukan tanggung jawab owner, dan jika ada pembaruan yang membuat suatu object bermasalah seperti teks yang tidak terender dengan jelas atau tidak menampilkan, silahkan [laporkan melewati github issues](https://github.com/ernestoyoofi/animeindo-api/issues/new).

[![Apache Lisence 2.0](https://img.shields.io/badge/Apache_License-c92037?style=for-the-badge&logo=apache&logoColor=white)](./LICENSE)
[![Vercel App](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)