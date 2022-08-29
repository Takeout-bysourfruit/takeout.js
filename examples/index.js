
// Import takeout.js
const TakeoutClient = require('takeout.js')
// Initialize a new Takeout Client. Use TakeoutClient(true) to enable "debug" mode.
const client = new TakeoutClient()
// Login with your token. Get this from the Takeout dashboard!
client.login('token')
// Define a "template" for your email
const emailTemplate = {
    to: 'test@example.com',
    from: 'Takeout.js', // This will be (e.g) 'Takeout.js via Takeout' for free users
    subject: 'Your car\'s extended warranty has expired',
    text: 'If I define HTML, this won\'t be sent.',
    html: "<html><body style='text-align: center'><h1>Test from JS</h1><h2 style='color: red'>this should be in red</h2><img src='https://i.insider.com/5fa98250f7d1cb0019e3a908?width=1000&format=jpeg&auto=webp'/></body></html>", // or, use client.getHTMLFileContents()
}

client.send(emailTemplate)
