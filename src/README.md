<p align='center'><img src="https://i.ibb.co/s9kq3V0/takeout.png" height="150px"/></p>
<h1 align='center'>Takeout.js</h1>

<p align='center'>
    <img display="inline-block" src="https://img.shields.io/npm/v/takeout.js?style=for-the-badge" /> <img display="inline-block"  src="https://img.shields.io/bundlephobia/minzip/takeout.js?style=for-the-badge" /> <img display="inline-block" src="https://img.shields.io/badge/Made%20with-JavaScript-yellow?style=for-the-badge" />
</p>
<p align='center'>Takeout.js is super easy to use. In under 10 lines of code, you can send an email to anyone, anywhere. Ah, the joys of the internet.</p>

## Installation 🏗
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

## Setup 🛠
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

## Sending your first email 📤

Define a 'template' similar to this: 
```js
const emailTemplate = {
    to: 'test@example.com',
    from: 'Takeout.js', // This will be (e.g) 'Takeout.js via Takeout' for free users
    subject: 'I just sent an email using Takeout!',
    html: "<b>My first email!</b>",
}
```
or
```js
const emailTemplate = {
    to: 'test@example.com',
    from: 'Takeout.js', // This will be (e.g) 'Takeout.js via Takeout' for free users
    subject: 'I just sent an email using Takeout!',
    text: 'My first email!',
}
```
and then... 
```js
client.send(emailTemplate)
```
You can also use await for `client.send()` - where it'll return an email ID. This ID can be used to view your email in the browser (soon).

See? It's super simple. Oh, and you can also import HTML directly from a file, using `getHTMLFileContents()`. 
This is demonstrated here: 
```js
async function sendEmail() {
    const html = await client.getHTMLFileContents('templates/index.html')

    const emailTemplate = {
        to: 'hello@sourfruit.xyz',
        from: 'Takeout.js', // This will be (e.g) 'Takeout.js via Takeout' for free users
        subject: 'Getting HTML from a file',
        html: html,
    }

    await client.send(emailTemplate)
}

sendEmail()
```

## Additional fields
Takeout.js allows you to CC one person (a method to CC more is coming soon). Define this in your template. 
```js
const emailTemplate = {
    to: 'test@example.com',
    from: 'Takeout.js', // This will be (e.g) 'Takeout.js via Takeout' for free users
    subject: 'I just sent an email using Takeout!',
    text: 'My first email!',
    cc: 'test@notexample.com'
}
```

Furthermore, Takeout.js allows you to set a reply-to email. Define this in your template. 
```js
const emailTemplate = {
    to: 'test@example.com',
    from: 'Takeout.js', // This will be (e.g) 'Takeout.js via Takeout' for free users
    subject: 'I just sent an email using Takeout!',
    text: 'My first email!',
    replyTo: 'reply@tome.com'
}
```

## Errors
With the arrival of 1.2.0, came a new method to authenticate with Takeout's API. This removed your token from the request body and moved it to the Authorization header. If you're running an older version Takeout.js, Takeout will throw an error. Upgrade to a version >=1.2.0

## Roadmap 🚦
- Lodash templating built in, allowing you a greater variety of options in a single package (with... well some dependencies). 
- Fixing SMTP email validation.
- Bug fixes.
- A lot more.

### See complete examples in [examples/](https://github.com/Takeout-bysourfruit/takeout.js/tree/main/examples)