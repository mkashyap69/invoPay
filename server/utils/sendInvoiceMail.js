const SibApiV3Sdk = require('sib-api-v3-sdk');
const html = require('./createHTMLForInvoice');

const sendInvoiceMail = (
  seller,
  sellerEmail,
  clientName,
  clientEmail,
  invoiceId,
  invoiceDate,
  total,
  invoiceListArray,
  payUrl
) => {
  let defaultClient = SibApiV3Sdk.ApiClient.instance;

  let apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.SENDGRID_API_KEY;

  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = `Your invoice from ${seller || 'InvoPay'}`;
  sendSmtpEmail.htmlContent = html(
    seller,
    sellerEmail,
    clientName,
    clientEmail,
    invoiceId,
    invoiceDate,
    total,
    invoiceListArray,
    payUrl
  );
  sendSmtpEmail.sender = { name: 'InvoPay', email: 'mk671326@gmail.com' };
  sendSmtpEmail.to = [{ email: `${clientEmail}`, name: `${clientName}` }];

  apiInstance.sendTransacEmail(sendSmtpEmail).catch((err) => {
    throw new Error(err);
  });
};

module.exports = sendInvoiceMail;
