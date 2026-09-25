const { fetchPostsTitles } = require('./fetch-data');

(async () => {
  const titles = await fetchPostsTitles();
  titles.forEach((title, index) => {
    console.log(`${index + 1}. ${title}`);
  });
})();
