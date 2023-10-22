// pages/api/deploy.js
import { deployContract } from '../../../../scripts/deployContract';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { address } = req.body;
    try {
      const contractAddress = await deployContract(address);
      return res.status(200).json({ contractAddress });
    } catch (error) {
      return res.status(500).json({ error: 'Contract deployment failed!' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
