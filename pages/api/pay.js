import axios from 'axios';

export default async function handler(req, res) {
  const { amount, phoneNumber } = req.body;

  const easyPaisaApiUrl = 'https://easypaisaapiurl.com';
  const apiKey = 'YOUR_EASYPAY_API_KEY';

  try {
    const response = await axios.post(easyPaisaApiUrl, {
      amount,
      phoneNumber,
      apiKey
    });

    if (response.data.success) {
      res.json({ success: true, message: 'Payment successful!' });
    } else {
      res.json({ success: false, message: 'Payment failed!' });
    }
  } catch (error) {
    res.json({ success: false, message: 'An error occurred!' });
  }
}
