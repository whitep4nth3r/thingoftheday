const https = require("https");

async function getPosts() {
  return new Promise((resolve, reject) => {
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

    let posts = "";

    const req = https.request(options, (res) => {
      res.on("data", (data) => {
        posts += data;
      });

      res.on("end", () => {
        const parsedPosts = JSON.parse(posts);
        resolve(parsedPosts.data.microblogCollection.items);
      });
    });

    req.on("error", (e) => {
      console.error(e);
    });

    req.write(JSON.stringify({ query }));
    req.end();
  });
}

function buildRssItems(items) {
  const truncateLength = 44;

  return items
    .map((item) => {
      const hasText = item.text;
      const hasLink = item.link;
      const titleMaybeTruncated = hasText && item.text.length > truncateLength ? "..." : "";
      const title = hasText
        ? `${item.text.slice(0, truncateLength)}${titleMaybeTruncated}`
        : "New post";
      const maybeLink = hasLink ? ` - ${item.link}` : "";
      const description = hasText ? `${item.text}${maybeLink}` : "";

      return `
        <item>
        <title>${title}</title>
        <description>${description}</description>
        <author>whitep4nth3r@gmail.com (whitep4nth3r)</author>
        <link>https://thingoftheday.xyz#${item.sys.id}</link>
        <guid>https://thingoftheday.xyz#${item.sys.id}</guid>
        <pubDate>${item.sys.firstPublishedAt}</pubDate>
        </item>
        `;
    })
    .join("");
}

exports.handler = async function (event, context) {
  const rssFeed = `<?xml version="1.0"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>thingoftheday.xyz</title>
    <atom:link href="https://thingoftheday.xyz/.netlify/functions/rss" rel="self" type="application/rss+xml" />
    <link>https://thingoftheday.xyz</link>
    <description>thingoftheday is a lightweight microblogging site powered by Contentful and vanilla HTML, CSS and JavaScript.</description>
    ${buildRssItems(await getPosts())}
  </channel>
  </rss>`;

  return {
    statusCode: 200,
    contentType: "text/xml",
    body: rssFeed,
  };
};
