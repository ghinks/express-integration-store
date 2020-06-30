
const file = require('fs');
const path = require('path');

const fsp = file.promises;

const getCertificate = async () => {
  const certificate = await fsp.readFile(path.join(__dirname, '../selfsigned.crt'), 'utf-8');
  const key = await fsp.readFile(path.join(__dirname, '../selfsigned.key'), 'utf-8');
  return {
    certificate,
    key
  };
}
module.exports = getCertificate;

