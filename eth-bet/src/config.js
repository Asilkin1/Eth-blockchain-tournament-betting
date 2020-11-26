//Ropsten config
import Web3 from 'web3';
import constractJsonAbi from '../src/contracts/Bet.json';

//import ABI from '../src/contracts/Bet.json'; // Import ABI from contract JSON
const NETWORK_TYPE = 'private'  // Change to live for ropsten
const ENDPOINT = NETWORK_TYPE === 'private' ? "http://localhost:8545" : "https://ropsten.infura.io/v3/5bfb3a87841d45bfa539b7a56b26f69e"
const web3 = new Web3(new Web3.providers.HttpProvider(ENDPOINT))

// set default account for transactions
 web3.eth.defaultAccount = web3.eth.accounts[0];

// Parse contract ABI from Bet.json file in ../src/contracts/Bet.json
let betABI = JSON.parse(constractJsonAbi).abi;

// Replace '' with rating contract address obtained by truffle console
let betAddress = '0x4FCfcf75FDC2A58D26567b93aBDA853Fa66d41c3';

// Initialize the rating contract with web3 
// Reference: https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html
const betContract = new web3.eth.Contract(betABI, betAddress);


export {
bet,
web3,
NETWORK_TYPE,
betContract,
betAddress
}
