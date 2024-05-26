import axios from 'axios';

interface User {
  walletAddress?: string | undefined;
}

// Define the function as part of a React component or as a separate function that takes necessary parameters
const getBalance = (
  user: User | null,
  setWalletBalance: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!user || !user.walletAddress) {
    console.log('User or user wallet address not available');
    return;
  }
  axios
    .get(`/api/wallet/${encodeURIComponent(user.walletAddress)}`)
    .then((res) => {
      console.log('Wallet Balance:', res.data);
      setWalletBalance(res.data); // Assuming res.data is the balance and is a string
    })
    .catch((error) => {
      console.error('Error fetching wallet balance:', error);
    });
};
export default getBalance;
