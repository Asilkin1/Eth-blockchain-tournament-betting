//Ropsten config
import Web3 from 'web3';
import constractJsonAbi from '../src/contracts/Bet.json';

// import ABI from '../src/contracts/Bet.json'; // Import ABI from contract JSON
const NETWORK_TYPE = 'private'  // Change to live for ropsten
const ENDPOINT = NETWORK_TYPE === 'private' ? "http://localhost:8545" : "https://ropsten.infura.io/v3/cb6291b4d3ec4c61a184c278ebc1b438"
const web3 = new Web3(new Web3.providers.HttpProvider(ENDPOINT))

// [!] Discovery number 99: To make it work have to connect the current network to metamask
 const player1 = {
    address: '0x92A3743498a70Edf4acfE251F36095BD230fB359', // Sender account address
    privateKey: '0x348e234cbede4bb5e27a06b50791c54672b46ff34ca8985f44061565bee1b9e6' // private key
 };

 const player2 = {
    address: '0x16eC38E3921455034ff21ef89ECd9a2Ac44CC9d4', // Sender account address
    privateKey: '0xb3c39cfff9872d25c4d7befef0f3ec290f7938f68b250184d765d23103b7bf79' // private key
 }; 

// Parse contract ABI from Bet.json file in ../src/contracts/Bet.json
let betABI = constractJsonAbi.abi;

// Replace '' with rating contract address obtained by truffle console
let betAddress = NETWORK_TYPE === 'public' ? '0x7382793CCf185324a7595FECd06A1A95Caf323b0' : '0x97e8D20100502016994209b6e2660364B2143B2B';

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
