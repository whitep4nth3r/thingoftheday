import { ACCESS_TOKEN, SPACE_ID } from "./setup/credentials.js";

async function fetchData() {
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`;

  const query = `{
    microblogCollection {
      items {
        sys {
          firstPublishedAt
          id
        }
        text
        image {
          url
          title
          width
          height
          description
        }
        panther
        link
        linkText
      }
    }
  }`;

  const fetchOptions = {
    spaceID: SPACE_ID,
    accessToken: ACCESS_TOKEN,
    endpoint,
    method: "POST",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ query }),
  };

  const response = await fetch(endpoint, fetchOptions);
  const result = await response.json();

  return result;
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
    "Dec",
  ];

  return months[int];
};

const addLeadingZero = (num) => {
  num = num.toString();

  while (num.length < 2) {
    num = `0${num}`;
  }

  return num;
};

const renderFooterDate = () => {
  const footerYearHolder = document.querySelector("[data-footer-year]");
  const timestamp = Date.now();
  const date = new Date(timestamp);
  footerYearHolder.innerText = date.getFullYear();
};

const formatPublishedDateForDateTime = (dateString) => {
  const timestamp = Date.parse(dateString);
  const date = new Date(timestamp);

  return `${date.getFullYear()}-${addLeadingZero(
    date.getMonth() + 1
  )}-${date.getDate()}`;
};

const formatPublishedDateForDisplay = (dateString) => {
  const timestamp = Date.parse(dateString);
  const date = new Date(timestamp);

  return `${date.getDate()} ${getMonthStringFromInt(
    date.getMonth()
  )} ${date.getFullYear()}`;
};

const microblogHolder = document.querySelector("[data-items]");

const itemClassNames = {
  container: "item__container",
  topRow: "item__topRow",
  date: "item__date",
  img: "item__img",
  link: "item__link",
  panther: "item__panther",
  text: "item__text",
};

const newPantherEl = (props) => {
  const { panther } = props;

  return `
    <img
      alt="${panther} panther emote"
      class="${itemClassNames.panther}"
      height="50"
      src="./panthers/${panther}.svg"
      width="50"
    />
  `;
};

const newDateEl = (props) => {
  const { sys } = props;

  return `
    <time
      class="${itemClassNames.date}"
      datetime="${formatPublishedDateForDateTime(sys.firstPublishedAt)}"
    >
      ${formatPublishedDateForDisplay(sys.firstPublishedAt)}
    </time>
  `;
};

const newTopRow = (props) => {
  const { panther, sys } = props;

  return `
    <div
      class="${itemClassNames.topRow}"
    >
      ${newPantherEl({ panther })}
      ${newDateEl({ sys })}
    </div>
  `;
};

const newImgEl = (props) => {
  const { description, height, url, width } = props;

  return `
    <img
      alt="${description}"
      class="${itemClassNames.img}"
      height="${height}"
      src="${url}?w=500"
      width="${width}"
    />
  `;
};

const newTextEl = (props) => {
  const { text } = props;

  return `
    <h2
      class="${itemClassNames.text}"
    >
      ${text}
    </h2>
  `;
};

const newLinkEl = (props) => {
  const { link, linkText } = props;

  return `
    <a
      class="${itemClassNames.link}"
      href="${link}"
      rel="noopener noreferrer"
      target="_blank"
    >
      ${linkText || "View more"}
    </a>
  `;
};

const newItemEl = (props) => {
  const { image, link, linkText, sys, text } = props;

  return `
    <article
      id="${sys.id}"
      class="${itemClassNames.container}"
    >
      ${newTopRow(props)}
      ${image ? newImgEl(image) : ''}
      ${text ? newTextEl({ text }) : ''}
      ${link ? newLinkEl({ link, linkText }) : ''}
    </article>
  `;
};

const newItemsEl = (props) => {
  const { items } = props;

  return items.map((item) => newItemEl(item)).join('');
};

const renderItems = (items) => {
  microblogHolder.insertAdjacentHTML("afterbegin", newItemsEl({ items }));
};

async function main() {
  const {
    data: {
      microblogCollection: { items },
    },
  } = await fetchData();

  renderItems(items);
  renderFooterDate();
}

main();
