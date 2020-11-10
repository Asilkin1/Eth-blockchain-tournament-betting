import Web3 from 'web3';
const web3=new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// Test network
// Replace '' with a real account from ganache
let account0 = ''// Replace [] with rating ABI obtained by truffle console. Only the part between [] (inclusive)
let ratingABI = [] 

// Replace ''  with rating address obtained by truffle console
let ratingAddress='';

// Initialize the rating contract with web3 
// Reference: https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html

const ratingContract=new web3.eth.Contract(ratingABI, ratingAddress)

export {ratingContract, account0};

// Ropsten config
// import Web3 from 'web3';
// const NETWORK_TYPE = 'live'
// const ENDPOINT = NETWORK_TYPE === 'private' ? "http://localhost:8545" : "https://ropsten.infura.io/v3/5bfb3a87841d45bfa539b7a56b26f69e"
// const web3 = new Web3(new Web3.providers.HttpProvider(ENDPOINT))

// let defaultAccount = {
// address: '0xF7f538Deb76BF7EB41F7ffD224FD33c40858adce', // Sender account from metamast 
// privateKey: '2763aa30362af58a9d23bdc57dfa5b85c780eb2668d303c9cdb64a7e60570ce1' // private key
// }

// // Replace [] with rating ABI obtained by truffle console. Only the part between [] (inclusive)
// let ratingABI = []

// // Replace '' with rating contract address obtained by truffle console
// let ratingAddress = ''

// // Initialize the rating contract with web3 
// // Reference: https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html
// const ratingContract = new web3.eth.Contract(ratingABI, ratingAddress)
// export {
// web3,
// NETWORK_TYPE, 
// defaultAccount,
// ratingContract 
// }
