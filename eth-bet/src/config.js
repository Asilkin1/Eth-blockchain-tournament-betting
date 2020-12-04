//Ropsten config
import Web3 from 'web3';
import constractJsonAbi from '../src/contracts/Bet.json';

// import ABI from '../src/contracts/Bet.json'; // Import ABI from contract JSON
const NETWORK_TYPE = 'private'  // Change to live for ropsten
const ENDPOINT = NETWORK_TYPE === 'private' ? "http://localhost:8545" : "https://ropsten.infura.io/v3/5bfb3a87841d45bfa539b7a56b26f69e"
const web3 = new Web3(new Web3.providers.HttpProvider(ENDPOINT))

// [!] Discovery number 99: To make it work have to connect the current network to metamask
 const player1 = {
    address: '0xB7060EdA50dF990C964fcC9A31078f8Cf624e277', // Sender account address
    privateKey: '0xa3611ad41115c914243a519e88b2fd7c2228006263139cf81b4e058c4235300f' // private key
 };

 const player2 = {
    address: '0xEd44Cf7b2000b88A1b7D2B67f64939C91BaDB722', // Sender account address
    privateKey: '0xfc77f5e37f8a4e38a64aa483995a15320c393b0a7fafea83431895b463e1d993' // private key
 }; 

// Parse contract ABI from Bet.json file in ../src/contracts/Bet.json
let betABI = constractJsonAbi.abi;

// Replace '' with rating contract address obtained by truffle console
let betAddress = '0x4FCfcf75FDC2A58D26567b93aBDA853Fa66d41c3';

// Initialize the rating contract with web3 
// Reference: https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html
const betContract = new web3.eth.Contract(betABI, betAddress);


export {
web3,
NETWORK_TYPE,
betContract,
betAddress,
player1,
player2
}
