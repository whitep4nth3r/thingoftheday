![Screenshot of thingoftheday.xyz](./assets/screenshot.png)

# thingoftheday

## A lightweight microblogging site powered by Contentful and vanilla HTML, CSS and JavaScript.

[Visit thingoftheday](https://thingoftheday.xyz/)

___

## Want to build your own thingoftheday?

Follow this quick setup guide to get started in minutes!

We're going to make some small changes to some handy files in the `./setup` directory, and use the Contentful CLI to import the content model and example content provided into your own Contentful space.

## Step 1: Fork the repo to your local machine!

___

## Step 2: Create your Contentful account

[Sign up here.](https://www.contentful.com/sign-up/)

___

## Step 3: Create a new space inside your Contentful account

- Grab the Space ID from Settings > General Settings
- Generate an access token for the Content Delivery API from Settings > API keys

___

## Step 4: Configure your credentials in this repository

- Open up `./setup/contentful-export.json` and replace all instances of SPACE_ID with your new Space ID.
- Add your Space ID and access token to `./setup/credentials.js`

___

## Step 5: Install the Contentful CLI

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

## Step 6: Authenticate with the CLI

Run `contentful login` in your terminal and follow the instructions in your browser.

___

## Step 7: Import the example content model and content to your Contentful space

[Access the Contentful CLI docs on importing/exporting data here.](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/)

### ::TLDR::

Run the following command in your terminal, ensuring you switch out SPACE_ID for your new Space ID.

```bash
cd /path/to/repo/thingoftheday/setup

contentful space import --space-id SPACE_ID --content-file contentful-export.json
```

The terminal will do some fancy things. If all looks good - refresh Contentful in your browser and you'll find the content model and example content has been imported for you! 🎉🎉🎉

___

## Step 8: Run the application on your machine

thingoftheday uses no frameworks and is powered by vanilla HTML, CSS and JavaScript!

To be able to serve the JS module to the browser, you'll need to serve the files over a local http server.

[You can do this really nicely with this http-server package.](https://www.npmjs.com/package/http-server)

Install http-server globally, and start the development server locally by running:

```bash
cd path/to/repo
npx http-server
```

## Step 9: Sit back and relax!

With your http server started, your credentials file configured, and your content model imported, you'll be able to visit your very own thingoftheday microblog in your browser - all within minutes.

That was almost too easy!

And remember:

## _Build stuff, learn things, love what you do_