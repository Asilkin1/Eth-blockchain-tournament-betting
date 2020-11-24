// This is an API for Bet.sol function calls
import {web3, betContract,betAddress} from './config'; // Backend imports

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
// Get tournaments left
  function getTournamentsLeft(){
    betContract.methods.getTournamentsLeft().send(
      {
        from:'0xB7060EdA50dF990C964fcC9A31078f8Cf624e277'
      }, (error,result) => {
        if(!error)
          console.log(result);
        else{
          console.log(error);
        }
      });
  }

// Export all function
export{
getAccounts,
getTournamentsLeft

}