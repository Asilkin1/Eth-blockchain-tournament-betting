const BetContract = artifacts.require('Bet');

// Deploy a contract with parameters
module.exports = function(deployer){
    deployer.deploy(BetContract);
}