require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

// use smart contract ABI
const contract = require("../artifacts/contracts/hiDanNFT.sol/MyNFT.json");
// add contract address
const contractAddress = "0x8A01A8434a765B785a1C924798333001e63143bD";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

// mint that NFT!
async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

// the transaction
  const tx = {
    'from': PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 2999999987,
    'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
  };

// sign transaction and ensure it went through
const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
}

mintNFT("https://gateway.pinata.cloud/ipfs/QmafxAscfAkbjGEV66E1Dvbk2gFptFiDcdV857huSYieYj");
