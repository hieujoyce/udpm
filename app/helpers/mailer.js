require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const { OAuth2 } = google.auth;
const refreshToken = process.env.REFRESH_TOKEN;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refreshToken,
  });
  // console.log('T: ' + 'H');
  // const accessToken = await oauth2Client.getAccessToken();
  // console.log('T: ' + accessToken);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      accessToken:
        'ya29.a0AWY7CkkUMoquHRDECv2jlPT10RdduXn1OLLVQpWCpmVl0DP-J3fpPastI_9zee_p6efNywISAApb_QsQ-FH2eodSUybpQA2xwfBz0ZQknHz_pO-h7uVCYgjwm45sa0-_35UIoHfqmSLXpYetc6rpSLnhJn7IaCgYKAZ0SARISFQG1tDrp5k-BGt1V35lJ3tLjfoS0gQ0163',
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken,
    },
  });

  return transporter;
};

exports.sendEmail = async (emailOptions) => {
  const emailTransporter = await createTransporter();

  await emailTransporter.sendMail(emailOptions);
};
