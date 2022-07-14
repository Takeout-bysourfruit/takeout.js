const fetch = require('isomorphic-unfetch')
const minify = require('html-minifier').minify;
const fs = require('fs');

/* 
WELCOME TO THE DEPTHS OF HELL, SORRY, I MEANT THE SOURCE FOR TAKEOUT.JS 

Here, you'll find all the questionable, non-TypeScript code that makes your life as a developer 
fairly easy. At least when it comes to sending emails. 
*/

class TakeoutClient {
    constructor(debug = false) {
        this.debug = debug
        this.token = ''
        this.baseUrl = 'https://takeout.bysourfruit.com'
    }

    /* Mini-docs: 
    *
    * Use this after "const client = new TakeoutClient()"
    * An example is here: 

        client.login('token')

    */

    async login(token) {
        this.token = token
        const res = await fetch(`${this.baseUrl}/api/auth/verify`, {
            method: "POST",
            body: JSON.stringify({ token: token }),
            headers: { "Content-Type": "application/json" }
        })

        const response = await res.json()
        if (!res.ok) throw new Error(`Takeout Login Error! ${res.status}`)

        if (res.ok) { if (this.debug == true) { console.log(response.message) } return { message: response.message, authenticated: true } }
    }


    /* Mini-docs: 
    *
    * Use it anywhere. It expects a path to an html file.
    * An example is here: 

        const html = await client.getHTMLFileContents('index.html')

    */
    async getHTMLFileContents(file) {
        if (typeof 'window' === 'undefined') throw new Error('Getting contents from HTML files is not supported in the browser.')
        const fileContent = fs.readFileSync(file).toString()
        const mini = minify(fileContent, { html5: true, continueOnParseError: true });
        return mini
    }

    /* Mini-docs: 
    *
    * Use it after client.login('token'), via client.send('template'). It expects JSON!  
    * An example is here: 
    
        const template = {
            to: 'takeout@bysourfruit.com',
            from: '',
            subject: 'NPM MODULE TEST',
            // text: '', // you can either send text, or html. You can submit both fields, but HTML will be sent if it does exist.
            html: html,
        }

    * You'll receive an email-ID upon success. Eventually, you can use this ID to view the email in the browser, 
    * at https://takeout.bysourfruit.com/preview/[id]. THIS IS NOT SUPPORTED- YET!
    */
    async send(emailTemplate) {
        if (this.token == null || this.token.trim() === '') throw new Error(`Takeout Send Error! Token was either never provided, login failed, or something similar. Maybe try client.login('YOUR TOKEN')`)
        if (emailTemplate.to === null || emailTemplate.from === null || emailTemplate.subject === null) throw new Error(`Takeout Send Error! One of the required fields to send an email was not fufilled. Check if your receiver, sender, and subject are defined and passed as an object.`)

        const res = await fetch(`${this.baseUrl}/api/email/send`, {
            method: "POST",
            body: JSON.stringify({
                token: this.token,
                sender: emailTemplate.from.trim(),
                receiver: emailTemplate.to.trim(),
                subject: emailTemplate.subject.trim(),
                bodyText: emailTemplate.text,
                bodyHTML: emailTemplate.html
            }),
            headers: { "Content-Type": "application/json" }
        })
        const response = await res.json()
        if (!res.ok) throw new Error(`Takeout Login Error! ${res.status}`)

        if (res.ok) {
            if (this.debug === true) { console.log('Sent email successfully') }
            return { id: response["header"]["message-id"] }
        }
    }


    /* 
    * THIS FEATURE IS IN EARLY ALPHA! 
    * I DOUBT IT WORKS! 
    * YOU CAN TRY USING IT VIA client.verifyEmail('test@test.com')
    * IT RELIES ON THE API. IF THE API CODE IS SCREWED, SO IS THIS BAREBONES FUNCTION!
    */
    async verifyEmail(email) {
        if (email === null) throw new Error("Takeout Verify Error! An email wasn't provided")
        const res = await fetch(`${this.baseUrl}/api/email/verify`, {
            method: "POST",
            body: JSON.stringify({
                token: this.token,
                email: email
            }),
            headers: { "Content-Type": "application/json" }
        })
        if (!res.ok) throw new Error(`Takeout Login Error! ${res.status}`)

        const response = await res.json()
        return response.message
    }
}

module.exports = TakeoutClient

