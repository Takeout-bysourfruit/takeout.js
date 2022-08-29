// Import takeout.js
const TakeoutClient = require('takeout.js')
// Initialize a new Takeout Client. Use TakeoutClient(true) to enable "debug" mode.
const client = new TakeoutClient()
// Login with your token. Get this from the Takeout dashboard!
client.login('token')

async function sendEmail() {
    // or, just define some basic HTML in the 'template' 
    const html = await client.getHTMLFileContents('templates/index.html')

    // Define a "template" for your email
    const emailTemplate = {
        to: 'test@example.com',
        from: 'Takeout.js', // as of July 2022, this will be (e.g) 'Takeout.js via Takeout' 
        subject: 'Your car\'s extended warranty has expired',
        text: 'If I define HTML, this won\'t be sent.',
        html: html, // e.g: <b>hi, no .html file required</b>
    }

    // throw on a variable if you'd like to receive the email ID. 
    await client.send(emailTemplate)
}

sendEmail()
