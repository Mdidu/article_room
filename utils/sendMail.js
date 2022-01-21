const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.API_KEY_MAIL,
    },
  })
);

const sendMail = (email, username) => {
  const to = email;
  const subject = `Bienvenue ${username} ! Valider votre compte !`;
  const html = `Veuillez cliquer sur ce lien pour valider votre compte : <a href="${process.env.BASE_URL}/auth/validate/${username}">Valider votre compte !</a>`;

  transporter.sendMail({
    from: process.env.SENDER,
    to,
    subject,
    html,
  });
};

module.exports = sendMail;