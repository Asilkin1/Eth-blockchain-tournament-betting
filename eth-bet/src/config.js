//Ropsten config
import Web3 from 'web3';
import ABI from '../src/contracts/Bet.json'; // Import ABI from contract JSON
const NETWORK_TYPE = 'private'  // Change to live for ropsten
const ENDPOINT = NETWORK_TYPE === 'private' ? "http://localhost:8545" : "https://ropsten.infura.io/v3/5bfb3a87841d45bfa539b7a56b26f69e"
const web3 = new Web3(new Web3.providers.HttpProvider(ENDPOINT))

// set default account for transactions
 web3.eth.defaultAccount = web3.eth.accounts[0];

// Replace [] with rating ABI obtained by truffle console. Only the part between [] (inclusive)
let betABI = [
    {"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"minBet","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"uint256","name":"maxPlayers","type":"uint256"},{"indexed":false,"internalType":"bool","name":"done","type":"bool"}],"name":"finishedTournament","type":"event"},{"constant":true,"inputs":[],"name":"getTournamentsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getTournamentData","outputs":[{"internalType":"address payable[]","name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTournamentsLeft","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"concludeTournament","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_choice","type":"string"}],"name":"participateInTourney","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}
];

// Replace '' with rating contract address obtained by truffle console
let betAddress = '0x4FCfcf75FDC2A58D26567b93aBDA853Fa66d41c3';

// Initialize the rating contract with web3 
// Reference: https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html
const betContract = new web3.eth.Contract(betABI, betAddress)
export {
web3,
NETWORK_TYPE,
betContract,
betAddress
}
