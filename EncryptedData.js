const mongoose = require('mongoose');

const EncryptedDataSchema = new mongoose.Schema({
  encryptedData: String,
  encryptionType: String,
  iv: String,
  timestamp: Date
});

module.exports = mongoose.model('EncryptedData', EncryptedDataSchema);
