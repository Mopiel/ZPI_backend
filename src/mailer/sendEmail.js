import nodemailer from "nodemailer";
import cos from "./cos.html";

export async function sendEmail() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.fastmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "noreplayzpi@fastmail.com", // generated ethereal user
      pass: "n2haj5aazptbj7s5", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "Bartek czyli ja <noreplayzpi@fastmail.com>", // sender address
    to: "bartekwielki01@interia.pl, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  console.log("Preview URL: %s", info.to);
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}