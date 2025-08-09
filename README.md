# AnimeIndo API

[![GitHub stars](https://img.shields.io/github/stars/ernestoyoofi/animeindo-api?style=social)](https://github.com/ernestoyoofi/animeindo-api/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/ernestoyoofi/animeindo-api?style=social)](https://github.com/ernestoyoofi/animeindo-api/network/members)
[![GitHub license](https://img.shields.io/github/license/ernestoyoofi/animeindo-api)](https://github.com/ernestoyoofi/animeindo-api/blob/main/LICENSE)

RESTful API yang berfungsi sebagai jembatan untuk mendapatkan data dari situs-situs di manga atau anime Indonesia dan menyajikannya dalam format JSON.

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

- [Komiku.id (/api/komiku)](https://animeindoapi.vercel.app/api/komiku)

## 📚 Header / Query Permintaan Layanan

| header | query | value | deskripsi/penjelasan |
| -----  | ----- | ----- | -------------------- |
| `x-http-request` | `request` | `default`,`tls-client`,`proxy-default`,`proxy-[url]` | Digunakan pada metode permintaan data atau dalam scrapping data, sehingga data dapat diberikan tanpa adanya batasan, biasanya akan di atur pada `tls-client` |
