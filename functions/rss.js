//THIS IS A WORK IN PROGRESS!

const https = require("https");

exports.handler = async function (event, context) {
  let posts = "";

  function buildRssItems(items) {
    const returnRss = "";

    return `
    <title>${item.text}</title>
    <author>whitep4nth3r</author>
    <link>https://thingoftheday.xyz#${item.sys.id}</link>
    <pubDate>${item.sys.firstPublishedAt}</pubDate>
    <guid>${item.sys.id}</guid>
    `;
  }

  const query = `
  query {
    microblogCollection {
      items {
        sys {
          firstPublishedAt
          id
        }
        text
        link
        linkText
      }
    }
  }
  `;

  const options = {
    protocol: "https:",
    hostname: "graphql.contentful.com",
    path: "/content/v1/spaces/4nhaj6wzvnco",
    method: "POST",
    headers: {
      Authorization: "Bearer F91A7b3FyjTFeH0sN6pYIfo6Nu1WZ2byX8Rdc4McGUI",
      "Content-Type": "application/json",
    },
  };

  const req = https.request(options, (res) => {
    res.on("data", (data) => {
      posts += JSON.parse(data);
      process.stdout.write(posts);
    });
  });

  req.on("error", (e) => {
    console.error(e);
  });

  req.write(JSON.stringify({ query }));
  req.end();

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
    contentType: "text/xml",
    body: rssFeed,
  };
};
