const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const url = "https://www.theguardian.com/international";
axios(url)
  .then((response) => {
    const html = response.data;
    const x = cheerio.load(html);
    const articles = [];
    x(".fc-item__title", html).each(function () {
      const title = x(this).text();
      const url = x(this).find("a").attr("href");
      articles.push({ title, url });
    });
    console.log(articles);
  })
  .catch((err) => console.log(err));
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
