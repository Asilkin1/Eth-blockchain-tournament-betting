// This is an API for Bet.sol function calls

import {web3, betContract, NETWORK_TYPE} from './config'; // Backend imports
import Tx from 'ethereumjs-tx';

// getAccounts [This works because of a miracle]
function getAccounts(){
    web3.eth.getAccounts(function(error, result) {
      web3.eth.sendTransaction(
          {
            from: '0xB7060EdA50dF990C964fcC9A31078f8Cf624e277'                                      // Answer
          }, function(err, transactionHash) {
        if (!err){
          console.log(transactionHash + " success"); 
          console.log(result);
        }
          
        else{
          console.log(error);
          
        }
      });
  });
  }
  
// Get current tournament 
  async function loadCurrentTournament(){
    let currentIndex = await betContract.methods.getCurrentTournamentIndex().call();
    let currentTournamentLoaded =  await betContract.methods.getCurrentTournament(currentIndex);
    console.log(currentIndex);
    console.log(currentTournamentLoaded);

    return currentTournamentLoaded;
  }
// Get tournaments left
async function getTournamentsLeftAsync(){

    let tounrnamentsLeft = await betContract.methods.getTournamentsLeft().call();
    return tounrnamentsLeft;
}

/**
 * Return a single tournaments specified by index
*/
async function getTournamentDataAsync(index){
  let singleTournamentData = betContract.methods.getTournamentData(index).call();
  console.log(singleTournamentData);
  return singleTournamentData;
}

// getTournamentsCount() number of tournament
async function getTournamentsCountAsync(){
  let tournamentCount = await betContract.methods.getTournamentsCount().call();
  console.log(tournamentCount);
  return tournamentCount;
}

// concludeTournament() - finish any tournament where max number of players participated
async function concludeTournamentAsync(){
  let tournamentDone = await betContract.methods.concludeTournament().call();
  console.log(tournamentDone);
  return tournamentDone;
}

// participateInTourney(answer) - player sending answer
function participateInTourney(answer,minBet){
  web3.eth.getTransactionCount(web3.eth.defaultAccount.address, (err, txCount) => {
    
    // Transaction object
    const txObject = {
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(468000), // Raise the gas limit to a much higher amount
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'wei')),
      to: betContract._address,
      data: betContract.methods.participateInTourney(answer).encodeABI()
    }

    // Which network
    const tx = NETWORK_TYPE === 'private' ? new Tx(txObject) : new Tx(txObject, { 'chain': 'ropsten' });
    tx.sign(Buffer.from(web3.eth.defaultAccount.privateKey.substr(2), 'hex'))

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
      console.log('err:', err, 'txHash:', txHash)
      if (!err) {
        console.log();
      }
    })
  })
}

// Export all function
export{
getAccounts,
getTournamentsLeftAsync,
getTournamentDataAsync,
getTournamentsCountAsync,
concludeTournamentAsync,
participateInTourney
}