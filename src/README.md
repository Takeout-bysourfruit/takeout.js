# Takeout.js 
<img src="https://img.shields.io/npm/v/takeout.js?style=for-the-badge" />

Takeout.js is super easy to use. In under 10 lines of code, you can send an email to anyone, anywhere. Ah, the joys of the internet. 

## Installation 
You can install Takeout.js using either NPM or Yarn. 
```shell
$ npm install takeout.js
```
```shell
$ yarn add takeout.js
```

Then, import it like this:
```js
const TakeoutClient = require('takeout.js')
const client = new TakeoutClient()
```

You can also initialise a new TakeoutClient with 'debug' mode enabled via `new TakeoutClient(true)`. For now, it just prints success messages to the console. 

## Setup
First, get your token from the [Takeout dashboard](https://takeout.bysourfruit.com/dashboard). You'll need it in a little bit.

Then, using that token you just got, use it here: 
```js
client.login('your token here')
```

As of right now, your code should look something like this:
```js
const TakeoutClient = require('takeout.js')
const client = new TakeoutClient()

client.login('your token here')
```

"But I want to actually send an email!" => we're getting there!  

## Sending your first email

Define a 'template' similar to this: 
```js
const emailTemplate = {
    to: 'test@example.com',
    from: 'Takeout.js', // as of July 2022, this will be (e.g) 'Takeout.js via Takeout' 
    subject: 'I just sent an email using Takeout!',
    html: "<b>My first email!</b>",
}
```
or
```js
const emailTemplate = {
    to: 'test@example.com',
    from: 'Takeout.js', // as of July 2022, this will be (e.g) 'Takeout.js via Takeout' 
    subject: 'I just sent an email using Takeout!',
    text: 'My first email!',
}
```
and then... 
```js
client.send(emailTemplate)
```
You can also use await for `client.send()` - where it'll return an email ID. This ID can be used to view your email in the browser (soon).

See? It's super simple. Oh, and you can also import HTML directly from a file, using getHTMLFileContents(). 
This is demonstrated here: 
```js
async function sendEmail() {
    const html = await client.getHTMLFileContents('templates/index.html')

    const emailTemplate = {
        to: 'test@example.com',
        from: 'Takeout.js', // as of July 2022, this will be (e.g) 'Takeout.js via Takeout' 
        subject: 'Getting HTML from a file',
        html: html, 
    }

    client.send(emailTemplate)
}

sendEmail()
```

### See complete examples in [examples/](https://github.com/s0urfruit/takeout.js/tree/main/examples)
