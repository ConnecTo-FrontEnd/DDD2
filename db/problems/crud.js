const fs = require('fs');
const cheerio = require('cheerio');
const axios = require('axios');
const path = require('path');

let data = JSON.parse(fs.readFileSync(path.join(__dirname, './db.json')));

const fetchBOJ = (() => {
  const BASE_URL = 'https://www.acmicpc.net';
  const TAGS_PATH = '/problem/tags';
  const categories = ['그리디 알고리즘', '구현', '너비 우선 탐색', '깊이 우선 탐색', '정렬'];

  const fetchCategories = async () => {
    const result = [];
    try {
      const $ = cheerio.load((await axios.get(BASE_URL + TAGS_PATH)).data);

      $('tbody td:first-child a').each((i, $node) => {
        const path = $($node).attr('href');
        const category = $($node).text();
        if (categories.includes(category)) result.push({ path, category });
      });

      return result;
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  const fetchProblems = async _category => {
    const result = [];
    const { path, category } = _category;

    try {
      const $ = cheerio.load((await axios.get(BASE_URL + path)).data);

      $('tbody > tr td:nth-child(2) a').each((i, $node) => {
        const link = BASE_URL + $($node).attr('href');
        const _id = link.split('/').at(-1);
        const title = $($node).text();
        result.push({ link, title, id: `boj${_id}`, platform: 'boj', category });
      });
      return result;
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  return async () => {
    const categories = await fetchCategories();
    const result = [];
    for (const c of categories) {
      result.push(...(await fetchProblems(c)));
    }
    return result;
  };
})();

module.exports = {
  async update() {
    const boj = await fetchBOJ();
    fs.writeFileSync(path.join(__dirname, './db.json'), JSON.stringify(boj));
  },
  getRandom(amount, option = { exceptIds: [], removedIds: [] }) {
    const result = [];
    while (result.length < amount) {
      const i = Math.floor(Math.random() * data.length);
      if (!result.includes(i) && !option.exceptIds?.includes(data[i].id) && !option.removedIds?.includes(data[i].id))
        result.push(data[i]);
    }
    return result;
  },
};
