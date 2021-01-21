![Screenshot of thingoftheday.xyz](./assets/screenshot.png)

# thingoftheday

## A lightweight microblogging site powered by Contentful and vanilla HTML, CSS and JavaScript.

[Visit thingoftheday](thingoftheday.xyz)

___


## Using the Contentful CLI to get started really really quickly

There are some handy files in this repo to help you get started really quickly using the Contentful CLI.

[Access the Contentful CLI docs on importing/exporting data here.](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/)

### 1. Create your Contentful account

[Sign up here.](https://www.contentful.com/sign-up/#small)

___

### 2. Create a new space inside your Contentful account

- Grab the Space ID from Settings > General Settings
- Generate an access token from Settings > API keys

___

### 3. Configure your credentials in this repository

- Open up `./setup/contentful-export.json` and replace all instances of SPACE_ID with your new Space ID.
- Add your Space ID and access token to `./setup/credentials.js`

___

### 4. Install the Contentful CLI

Using homebrew:

```bash
brew install contentful-cli
```

Using npm:

```bash
npm install -g contentful-cli
```

Using yarn:

```bash
yarn global add contentful-cli

```
___

### 5. Authenticate with the CLI

Run `contentful login` in your terminal and follow the instructions in your browser.

___

### 6. Import the example content model and content to your Contentful space

Run the following command in your terminal, ensuring you switch out SPACE_ID for your new Space ID.

```bash
cd /path/to/repo/thingoftheday/setup

contentful space import --space-id SPACE_ID --content-file contentful-export.json
```

The terminal will do some fancy things. If all looks good - refresh Contentful in your browser and see the content model and example content has been imported for you! 🎉🎉🎉

___

## Running the application on your machine

thingoftheday uses no frameworks and is powered by vanilla HTML, CSS and JavaScript!

To be able to serve the JS module to the browser, you'll need to serve the files over a local http server.

[You can do this really nicely with this http-server package.](https://www.npmjs.com/package/http-server)

Install http-server globally, and start the development server locally by running:

```bash
cd path/to/repo
npx http-server
```
