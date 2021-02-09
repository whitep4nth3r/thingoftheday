exports.handler = async function (event, context) {
  const doc = document.implementation.createDocument("", "", null);

  const rssElem = doc.createElement("rss");
  rssElem.setAttribute("version", "2.0");

  const channelElem = doc.createElement("channel");

  const titleElem = doc.createElement("title");
  titleElem.innerHTML = "thingoftheday.xyz";
  channelElem.appendChild(titleElem);

  const linkElem = doc.createElement("link");
  linkElem.innerHTML = "https://thingoftheday.xyz";
  channelElem.appendChild(linkElem);

  const descriptionElem = doc.createElement("description");
  descriptionElem.innerHTML =
    "thingoftheday is a lightweight microblogging site powered by Contentful and vanilla HTML, CSS and JavaScript.";
  channelElem.appendChild(descriptionElem);

  rssElem.appendChild(channelElem);
  doc.appendChild(rssElem);

  console.log(doc);

  return {
    statusCode: 200,
    contenType: "text/xml",
    body: doc,
  };
};
