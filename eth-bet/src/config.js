//Ropsten config
import Web3 from 'web3';
import constractJsonAbi from '../src/contracts/Bet.json';

// import ABI from '../src/contracts/Bet.json'; // Import ABI from contract JSON
const NETWORK_TYPE = 'private'  // Change to live for ropsten
const ENDPOINT = NETWORK_TYPE === 'private' ? "http://localhost:8545" : "https://ropsten.infura.io/v3/cb6291b4d3ec4c61a184c278ebc1b438"
const web3 = new Web3(new Web3.providers.HttpProvider(ENDPOINT))

// [!] Discovery number 99: To make it work have to connect the current network to metamask
 const player1 = {
    address: '0x1332e88875B1411d876a8386C024Dfc3FE8f5439', // Sender account address
    privateKey: '0x00a5eb3a1489aa2214c75ca9a7208568808d5575153431f95ca56b98b1cfc96f' // private key
 };

 const player2 = {
    address: '0xe6904F92D3a3080A81Bd93184E282B80427a2097', // Sender account address
    privateKey: '0x54b482b3d3b4176957a17fee1f35944dc574c323b6c5c058d9715d30ee4b5b49' // private key
 }; 

// Parse contract ABI from Bet.json file in ../src/contracts/Bet.json
let betABI = constractJsonAbi.abi;

// Replace '' with rating contract address obtained by truffle console
let betAddress = NETWORK_TYPE === 'public' ? '0x7382793CCf185324a7595FECd06A1A95Caf323b0' : '0x6bA3251017DEcfC4F129D8B2f371FBA540DD4Be9';

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
