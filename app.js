const spaceID = "4nhaj6wzvnco";
const endpoint = "https://graphql.contentful.com/content/v1/spaces/" + spaceID;
const accessToken = "F91A7b3FyjTFeH0sN6pYIfo6Nu1WZ2byX8Rdc4McGUI";
const query = `query{
  textCollection {
    items {
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
  method: 'POST',
  headers: {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify({ query })
}

const articleHolder = document.querySelector('[data-items]');

const populateDom = (items) => {
  items.forEach(item => {
    const newItemEl = document.createElement('article');
    let newTextEl, newImgEl, newLinkEl;

    const newPantherEl = document.createElement('img');
    newPantherEl.src = `./panthers/${item.panther}.png`;
    newPantherEl.alt = `Image of ${item.panther} panther emote`;
    newItemEl.appendChild(newPantherEl);

    if (item.text) {
      newTextEl = document.createElement('h2');
      newTextEl.innerText = item.text;
      newItemEl.appendChild(newTextEl);
    }

    if (item.link) {
      newLinkEl = document.createElement('a');
      newLinkEl.href = item.link;
      newLinkEl.innerText = 'Click here';
      newItemEl.appendChild(newLinkEl);
    }

    if (item.image) {
      newImgEl = document.createElement('img');
      newImgEl.src = item.image.url;
      newImgEl.alt = item.image.title;
      newItemEl.appendChild(newImgEl);
    }

    articleHolder.appendChild(newItemEl);
  })
}

fetch(endpoint, fetchOptions)
  .then(response => response.json())
  .then(data => populateDom(data.data.textCollection.items));

