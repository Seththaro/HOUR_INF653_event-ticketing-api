const QRCode = require('qrcode');

const generateQRCode = async (text) => {
  return QRCode.toDataURL(text);
};

module.exports = generateQRCode;
