const BetContract = artifacts.require('Bet');

// Parameters passed to constructor
const _minBet= 200;
const _name="Hello World Contract"
const max_players = 4;
const _answer = 'A'

// Deploy a contract with parameters
module.exports = function(deployer){
    deployer.deploy(BetContract,_minBet,_name, max_players, _answer);
}