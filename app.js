const spaceID = "4nhaj6wzvnco";
const endpoint = "https://graphql.contentful.com/content/v1/spaces/" + spaceID;
const accessToken = "F91A7b3FyjTFeH0sN6pYIfo6Nu1WZ2byX8Rdc4McGUI";
const query = `query{
  microblogCollection {
    items {
      sys {
        firstPublishedAt
      }
      text
      image {
        url
        title
      }
      panther
      link
    }
  }
}`

const fetchOptions = {
  spaceID,
  accessToken,
  endpoint,
  method: "POST",
  headers: {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
  body: JSON.stringify({ query })
}

const getMonthStringFromInt = (int) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dev"
  ]

  return months[int];
}

const addLeadingZero = (num) => {
  num = num.toString();
  while (num.length < 2) num = "0" + num;
  return num;
}

const formatPublishedDateForDateTime = (dateString) => {
  const timestamp = Date.parse(dateString);
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${addLeadingZero(date.getMonth() + 1)}-${date.getDate()}`;
}

const formatPublishedDateForDisplay = (dateString) => {
  const timestamp = Date.parse(dateString);
  const date = new Date(timestamp);
  return `${date.getDate()} ${getMonthStringFromInt(date.getMonth())} ${date.getFullYear()}`;
}

const microblogHolder = document.querySelector("[data-items]");

const renderItems = (items) => {
  items.forEach(item => {
    const newItemEl = document.createElement("article");

    const newPantherEl = document.createElement("img");
    newPantherEl.src = `./panthers/${item.panther}.png`;
    newPantherEl.alt = `Image of ${item.panther} panther emote`;
    newItemEl.appendChild(newPantherEl);

    const newDateEl = document.createElement("time");
    newDateEl.setAttribute("datetime", formatPublishedDateForDateTime(item.sys.firstPublishedAt));
    newDateEl.innerText = formatPublishedDateForDisplay(item.sys.firstPublishedAt);
    newItemEl.appendChild(newDateEl);

    if (item.text) {
      const newTextEl = document.createElement("h2");
      newTextEl.innerText = item.text;
      newItemEl.appendChild(newTextEl);
    }

    if (item.link) {
      const newLinkEl = document.createElement("a");
      newLinkEl.href = item.link;
      newLinkEl.innerText = "Click here";
      newItemEl.appendChild(newLinkEl);
    }

    if (item.image) {
      const newImgEl = document.createElement("img");
      newImgEl.src = item.image.url;
      newImgEl.alt = item.image.title;
      newItemEl.appendChild(newImgEl);
    }

    microblogHolder.appendChild(newItemEl);
  })
}

fetch(endpoint, fetchOptions)
  .then(response => response.json())
  .then(data => renderItems(data.data.microblogCollection.items));

