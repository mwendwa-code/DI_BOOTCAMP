const assert = require('node:assert/strict');
const http = require('node:http');

const sampleFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Sample Facts</title>
    <item>
      <title>Sample science fact</title>
      <link>https://thefactfile.org/sample-science-fact/</link>
      <pubDate>Wed, 30 Sep 2026 00:00:00 GMT</pubDate>
      <dc:creator>Editorial Staff</dc:creator>
      <category>Science</category>
      <description><![CDATA[<p>A sample science fact.</p>]]></description>
    </item>
    <item>
      <title>Sample history fact</title>
      <link>https://thefactfile.org/sample-history-fact/</link>
      <pubDate>Tue, 29 Sep 2026 00:00:00 GMT</pubDate>
      <dc:creator>Fact Editors</dc:creator>
      <category>History</category>
      <description><![CDATA[<p>A sample history fact.</p>]]></description>
    </item>
  </channel>
</rss>`;

function listen(server) {
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      server.removeListener('error', reject);
      resolve(server.address().port);
    });
  });
}

function close(server) {
  return new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
}

async function postForm(url, fields) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(fields)
  });
}

async function runChecks() {
  const feedServer = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/rss+xml' });
    response.end(sampleFeed);
  });
  const feedPort = await listen(feedServer);
  process.env.RSS_FEED_URL = `http://127.0.0.1:${feedPort}/feed`;

  const { app } = require('./server');
  const appServer = http.createServer(app);
  const appPort = await listen(appServer);
  const baseUrl = `http://127.0.0.1:${appPort}`;

  try {
    const homeResponse = await fetch(`${baseUrl}/`);
    const homeHtml = await homeResponse.text();
    assert.equal(homeResponse.status, 200);
    assert.match(homeHtml, /Sample science fact/);
    assert.match(homeHtml, /Editorial Staff/);

    const searchResponse = await fetch(`${baseUrl}/search`);
    const searchHtml = await searchResponse.text();
    assert.equal(searchResponse.status, 200);
    assert.doesNotMatch(searchHtml, /<article class="feed-post/);
    assert.match(searchHtml, /value="Science"/);

    const titleResponse = await postForm(`${baseUrl}/search/title`, { title: 'science' });
    const titleHtml = await titleResponse.text();
    assert.equal(titleResponse.status, 200);
    assert.match(titleHtml, /Sample science fact/);
    assert.doesNotMatch(titleHtml, /href="https:\/\/thefactfile\.org\/sample-history-fact\//);

    const categoryResponse = await postForm(`${baseUrl}/search/category`, { category: 'History' });
    const categoryHtml = await categoryResponse.text();
    assert.equal(categoryResponse.status, 200);
    assert.match(categoryHtml, /Sample history fact/);
    assert.doesNotMatch(categoryHtml, /href="https:\/\/thefactfile\.org\/sample-science-fact\//);

    console.log('RSS parser and route checks passed.');
  } finally {
    await close(appServer);
    await close(feedServer);
  }
}

runChecks().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});