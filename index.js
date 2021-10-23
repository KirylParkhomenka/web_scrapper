const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const PORT = 8000;
const URL = 'https://www.moneycontrol.com/news/tags/cryptocurrency.html';

const app = express();
const articles = [];

app.get('/', (req, res) => {
  res.json('Web Scrapper');
});

app.get('/news', (req, res) => {
  axios.get(URL).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $('#cagetory h2', html).each(function() {
      const title = $(this).text();
      const url = $(this).find('a').attr('href');

      articles.push({title, url});
    });
    res.json(articles);
  }).catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
