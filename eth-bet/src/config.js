//Ropsten config
import Web3 from 'web3';
import ABI from '../src/contracts/Bet.json'; // Import ABI from contract JSON
const NETWORK_TYPE = 'live'
const ENDPOINT = NETWORK_TYPE === 'private' ? "http://localhost:7545" : "https://ropsten.infura.io/v3/5bfb3a87841d45bfa539b7a56b26f69e"
const web3 = new Web3(new Web3.providers.HttpProvider(ENDPOINT))

// Accounts set by ganache wallet provider
let defaultAccount = {
address: '0xB7060EdA50dF990C964fcC9A31078f8Cf624e277', // Sender account from metamast 
privateKey: 'a3611ad41115c914243a519e88b2fd7c2228006263139cf81b4e058c4235300f' // private key
}

// Replace [] with rating ABI obtained by truffle console. Only the part between [] (inclusive)
let betABI = [ABI.abi];

// Replace '' with rating contract address obtained by truffle console
let betAddress = '0x4FCfcf75FDC2A58D26567b93aBDA853Fa66d41c3';

// Initialize the rating contract with web3 
// Reference: https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html
const betContract = new web3.eth.Contract(betABI, betAddress)
export {
web3,
NETWORK_TYPE, 
defaultAccount,
betContract
}
