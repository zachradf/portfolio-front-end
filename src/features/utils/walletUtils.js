import { ethers } from 'ethers';

export const generateWallet = () => {
    const wallet = ethers.Wallet.createRandom();
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
    };
  };

  export const connectToProvider = () => {
    const provider = new ethers.providers.InfuraProvider('goerli', 'YOUR_INFURA_PROJECT_ID');
    return provider;
  };
  
  export const getSigner = (privateKey, provider) => {
    const wallet = new ethers.Wallet(privateKey, provider);
    return wallet;
  };