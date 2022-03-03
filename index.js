const PORT = 8000;
const axios = require("axios"); // handles data transfers/retrievals
const cheerio = require("cheerio"); // like jQuery for traversing HTML files
const express = require("express"); //node framework

const app = express(); //framework for our server

const url = "https://www.theguardian.com/international"; //update to chosen website
axios(url) // data retrieval
  .then((response) => {
    const html = response.data;
    const x = cheerio.load(html);
    const articles = [];
    //change function below to match html elements on new site
    //Below we use cheerio to traverse html elements on retrieved site
    x(".fc-item__title", html).each(function () {
      const title = x(this).text();
      const url = x(this).find("a").attr("href");
      articles.push({ title, url });
    });
    console.log(articles);
  })
  .catch((err) => console.log(err));
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
