exports.handler = async function (event, context) {
  const rssFeed = `<?xml version="1.0"?>
  <rss version="2.0">
  <channel>
  <title>thingoftheday.xyz</title>
  <link>https://thingoftheday.xyz</link>
  <description>thingoftheday is a lightweight microblogging site powered by Contentful and vanilla HTML, CSS and JavaScript.</description>
  </channel>
  </rss>`;

  return {
    statusCode: 200,
    contenType: "text/xml",
    body: rssFeed,
  };
};
