const Parser = require('rss-parser');

const parser = new Parser();
const sampleFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Sample Facts</title>
    <item>
      <title>A sample fact</title>
      <link>https://www.thefactsite.com/sample-fact/</link>
      <pubDate>Wed, 30 Sep 2026 00:00:00 GMT</pubDate>
      <dc:creator xmlns:dc="http://purl.org/dc/elements/1.1/">Editorial Staff</dc:creator>
      <category>Science</category>
      <description><![CDATA[<p>This is a sample fact.</p>]]></description>
    </item>
  </channel>
</rss>`;

(async () => {
  const feed = process.argv.includes('--sample')
    ? await parser.parseString(sampleFeed)
    : await parser.parseURL('https://thefactfile.org/feed/');
  console.log(feed.title);

  feed.items.forEach((item) => {
    console.log(`${item.title}:${item.link}`);
  });
})().catch((error) => {
  console.error('Unable to parse the RSS feed:', error.message || error.code || String(error));
  process.exitCode = 1;
});