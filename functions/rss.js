const https = require("https");

exports.handler = async function (event, context) {
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
  {
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
    hostname: "thingoftheday.xyz",
    path: "https://graphql.contentful.com/content/v1/spaces/4nhaj6wzvnco",
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      Authorization: "Bearer F91A7b3FyjTFeH0sN6pYIfo6Nu1WZ2byX8Rdc4McGUI",
      "Content-Type": "application/json",
    },
  };

  let data = "";

  const req = https
    .request(options, (res) => {
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        console.log(JSON.parse(data));
      });
    })
    .on("error", (err) => {
      console.log("Error: ", err.message);
    });

  req.write(data);
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
