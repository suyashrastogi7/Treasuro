var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
var handlebars = require("handlebars");
var fs = require("fs");

var readHTMLFile = function (path, callback) {
	fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
		if (err) {
			callback(err);
			throw err;
		} else {
			callback(null, html);
		}
	});
};

smtpTransport = nodemailer.createTransport(
	smtpTransport({
		host: "gmail",
		secure: true,
		auth: {
			user: process.env.MAIL_EMAIL,
			pass: process.env.MAIL_PASSWORD,
		},
	})
);

const sendMail = function ({ email, username }) {
	readHTMLFile(__dirname + "config/emailTemplate.html", function (err, html) {
		var template = handlebars.compile(html);
		var replacements = {
			username: username,
		};
		var htmlToSend = template(replacements);
		var mailOptions = {
			from: "suyash.rastogi01@gmail.com",
			to: email,
			subject: "test subject",
			html: htmlToSend,
		};
		smtpTransport.sendMail(mailOptions, function (error, response) {
			if (error) {
				callback(error);
			}
		});
	});
};

module.exports = {
	sendMail,
};
