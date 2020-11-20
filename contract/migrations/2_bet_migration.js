const BetContract = artifacts.require('Bet');

const fs = require('fs');

// Data from tournament json file
const DATA = fs.readFileSync('../../eth-bet/src/TOURNAMENT_DATA/PAST_t.json');

// Parameters passed to constructor
const _minBet= 200;
const _name="Hello World Contract"
const max_players = 4;
const _answer = 'A'

// Deploy a contract with parameters
module.exports = function(deployer){
    deployer.deploy(BetContract,_minBet,_name, max_players, _answer);
}