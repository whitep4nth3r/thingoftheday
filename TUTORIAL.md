# Building a lightweight microblogging site with Contentful and ExpressJS

## Prepare your development environment

## Define your content model

The naming of the content model is important because you can't edit this easily!
(I called it text first, and it made no sense...)

- text - optional
- image - optional
- panther emote (list) - required
- link - optional

## Add some content

...

## Fetch the content

... see app.js

mention about date - you can add a date field with type date to the content model - and sys.created and sys.updated are available - but as we're using GraphQL and creating a super speedy app we're skipping this and using firstPublishedAt.

mention the access token is 'ok' to be exposed as it's read only on the CDA

## Style the content

...
