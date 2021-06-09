const SibApiV3Sdk = require('sib-api-v3-sdk');
const html = require('./createHTMLForReciept');

const sendPaymentMail = (
  senderOrganization,
  clientEmail,
  clientName,
  clientPhone,
  invoiceId,
  total,
  invoiceListArray
) => {
  let defaultClient = SibApiV3Sdk.ApiClient.instance;

  let apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.SENDGRID_API_KEY;

  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = `Your invoice from ${
    senderOrganization || 'InvoPay'
  }`;
  sendSmtpEmail.htmlContent = html(
    seller,
    clientName,
    receiptId,
    receiptDate,
    total,
    invoiceListArray,
    pdfUrl
  );
  sendSmtpEmail.sender = { name: 'InvoPay', email: 'mk671326@gmail.com' };
  sendSmtpEmail.to = [{ email: `${clientEmail}`, name: `${clientName}` }];

  apiInstance
    .sendTransacEmail(sendSmtpEmail)
    .catch((err) => console.error(err));
};

module.exports = sendPaymentMail;
