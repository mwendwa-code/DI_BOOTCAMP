const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const ejs = require('ejs');
const Parser = require('rss-parser');

const app = express();
const parser = new Parser();
const feedUrl = process.env.RSS_FEED_URL || 'https://thefactfile.org/feed/';
const fallbackPostUrl = 'https://www.thefactsite.com/';
const cacheDuration = 5 * 60 * 1000;
let feedCache;
let feedCachedAt = 0;

app.set('views', path.join(__dirname, 'public', 'pages'));
app.set('view engine', 'ejs');
app.engine('ejs', ejs.__express);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function getFeed() {
  if (feedCache && Date.now() - feedCachedAt < cacheDuration) {
    return feedCache;
  }

  const response = await axios.get(feedUrl, {
    timeout: 20000,
    headers: { 'User-Agent': 'rss-facts-feed/1.0' }
  });
  feedCache = await parser.parseString(response.data);
  feedCachedAt = Date.now();
  return feedCache;
}

function safePostUrl(link) {
  try {
    const url = new URL(link);
    return url.protocol === 'http:' || url.protocol === 'https:'
      ? url.href
      : fallbackPostUrl;
  } catch {
    return fallbackPostUrl;
  }
}

function normalizePost(item) {
  const categories = Array.isArray(item.categories)
    ? item.categories
    : item.category
      ? [item.category]
      : [];
  const rawContent = item.content || item.summary || item.description || '';
  const content = item.contentSnippet || rawContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  return {
    title: item.title || 'Untitled fact',
    link: safePostUrl(item.link),
    pubDate: item.pubDate || item.isoDate || '',
    creator: item.creator || item.author || 'Unknown',
    categories: categories.map(String),
    content
  };
}

function getCategories(items) {
  return [...new Set(items.flatMap((item) => (
    Array.isArray(item.categories)
      ? item.categories
      : item.category
        ? [item.category]
        : []
  ).map(String)))].sort((first, second) => first.localeCompare(second));
}

function getSearchViewData(items, options = {}) {
  return {
    title: 'Search facts',
    posts: (options.posts || []).map(normalizePost),
    categories: getCategories(items),
    titles: items.map((item) => item.title).filter(Boolean),
    searchTitle: options.searchTitle || '',
    searchCategory: options.searchCategory || '',
    notice: options.notice || ''
  };
}

function handleFeedError(response, error) {
  console.error('Unable to retrieve the RSS feed:', error.message || error.code || String(error));
  response.status(502).send('The facts feed is temporarily unavailable. Please try again shortly.');
}

app.get('/', async (request, response) => {
  try {
    const feed = await getFeed();
    const items = feed.items || [];
    response.render('index', {
      title: feed.title || 'Fact feed',
      feedTitle: feed.title || 'Fact feed',
      posts: items.map(normalizePost)
    });
  } catch (error) {
    handleFeedError(response, error);
  }
});

app.get('/search', async (request, response) => {
  try {
    const feed = await getFeed();
    response.render('search', getSearchViewData(feed.items || []));
  } catch (error) {
    handleFeedError(response, error);
  }
});

app.post('/search/title', async (request, response) => {
  try {
    const feed = await getFeed();
    const items = feed.items || [];
    const searchTitle = String(request.body.title || '').trim();
    const posts = searchTitle
      ? items.filter((item) => (item.title || '').toLocaleLowerCase().includes(searchTitle.toLocaleLowerCase()))
      : [];

    response.render('search', getSearchViewData(items, {
      posts,
      searchTitle,
      notice: searchTitle ? (posts.length ? '' : 'No facts matched that title.') : 'Enter a title to search.'
    }));
  } catch (error) {
    handleFeedError(response, error);
  }
});

app.post('/search/category', async (request, response) => {
  try {
    const feed = await getFeed();
    const items = feed.items || [];
    const searchCategory = String(request.body.category || '').trim();
    const posts = searchCategory
      ? items.filter((item) => {
        const categories = Array.isArray(item.categories)
          ? item.categories
          : item.category
            ? [item.category]
            : [];
        return categories.some((category) => String(category).toLocaleLowerCase() === searchCategory.toLocaleLowerCase());
      })
      : [];

    response.render('search', getSearchViewData(items, {
      posts,
      searchCategory,
      notice: searchCategory ? (posts.length ? '' : 'No facts matched that category.') : 'Choose a category to search.'
    }));
  } catch (error) {
    handleFeedError(response, error);
  }
});

function startServer(port = process.env.PORT || 3000) {
  return app.listen(port, () => {
    console.log(`RSS facts feed app listening at http://localhost:${port}`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { app, getFeed, normalizePost, startServer };