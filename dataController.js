const EncryptedData = require('../models/EncryptedData');
const { encryptAES, decryptAES } = require('../utils/cryptoUtil');

exports.storeData = async (req, res) => {
  const { data, encryption } = req.body;

  if (encryption !== 'aes') {
    return res.status(400).json({ error: 'Unsupported encryption method.' });
  }

  const { encryptedData, iv } = encryptAES(data);

  const record = new EncryptedData({
    encryptedData,
    encryptionType: encryption,
    iv,
    timestamp: new Date()
  });

  await record.save();
  res.json({ message: 'Data stored securely.', id: record._id });
};

exports.getData = async (req, res) => {
  try {
    const record = await EncryptedData.findById(req.params.id);
    if (!record) return res.status(404).json({ error: 'Data not found.' });

    const decrypted = decryptAES(record.encryptedData, record.iv);
    res.json({ data: decrypted });
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving data.' });
  }
};
