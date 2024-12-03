const Mailgun = require('mailgun.js');
const FormData = require('form-data');

const mailgun = new Mailgun(FormData)
const mg = mailgun.client({key : process.env.MAILGUN_API_KEY,  username : 'supercraftgame', url: 'https://api.eu.mailgun.net'});

const from = "Super Craft Game <supercraftgame@mail.qberal.com>";

function passwordReset(to) {

    mg.messages.create('mail.qberal.com', {
        from: from,
        to: to,
        subject: "Hello",
        text: "Coucou ceci est un super test non?",
        html: "<p>test</p>",
    })
        .then(msg => console.log(msg)) // logs response data
        .catch(err => console.error(err)); // logs any error


}

module.exports = {
    passwordReset,
};
