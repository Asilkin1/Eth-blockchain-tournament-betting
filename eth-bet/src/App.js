import { Spinner, Container, Row, Col, ModalFooter } from 'react-bootstrap';
import { useState, useEffect } from 'react';



// ------------------------------------------------------------------App components imports
import Navigation from './components/navigation/navigation';
import WinnersList from './components/winnerslist/winnerslist';
import SingleTournament from './single_tournament/singletournament';
import Footer from './components/footer/footer';
// ----------------------------------------------------------------------------------------
import { web3, betContract, NETWORK_TYPE, player1, player2, betAddress } from './config'; // Backend imports
// ----------------------------------------------------------------------------------------
import './App.css';


const Tx = require('ethereumjs-tx').Transaction;


function App() {

  // Set first player as an avtive. Then switch back to the second
  const [ActivePlayerOne, setActivePlayer] = useState(true);

  // Block number
  const [blockNumber, setBlockNumber] = useState('');

  // Current player
  const currentPlayer = ActivePlayerOne ? player1 : player2;

  // Current tournament
  const [currentTournament, setCurrentTournament] = useState('');

  // Current tournament index
  const [currentTournamentIndex, setCurrentTournamentIndex] = useState(0);

  // Number of winners
  const [latestWinner, setLatesWinner] = useState('');

  // Wait for transaction to be mined
  const [waitingForMinedTransaction, setSpinnerHidden] = useState(true);

  // Wait for block to be mined found on stackoverflow to wait for transaction to be mined
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  // Expected block time
  const expectedBlockTime = 1000;


  /** Player can participate in tournament
   * 
   * @param { answer } The answer recorded from the form 
   * @param { amount } This is hardcoded and value set to 5
   * 
   */

  // SEND ANSWER TO BACKEND ------------------------------------------------------------------------------------------------------------------------------------
  async function participateInTourney(answer) {
    setTimeout(3000);
    await web3.eth.getTransactionCount(currentPlayer.address, (err, txCount) => {

      // Transaction object
      const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(8000000), // Block gas limit
        gasPrice: web3.utils.toHex(web3.utils.toWei('10000000000', 'wei')), // Pretty good price, for fast execution
        to: betAddress,
        value: web3.utils.toHex(currentTournament._minBet),
        data: betContract.methods.participateInTourney(answer).encodeABI()
      }

      // Which network
      const tx = NETWORK_TYPE === 'private' ? new Tx(txObject) : new Tx(txObject, { 'chain': 'ropsten' });
      tx.sign(Buffer.from(currentPlayer.privateKey.substr(2), 'hex'))   // Suppose to be a private key

      const serializedTx = tx.serialize()
      const raw = '0x' + serializedTx.toString('hex')

      web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('err:', err, 'txHash:', txHash)
        if (!err) {
          console.log(`Transaction hash ${txHash}`);
          let transactionReceipt = null;
          while (transactionReceipt == null) { // Waiting expectedBlockTime until the transaction is mined

            // Show some spinners for UI
            setSpinnerHidden(false);

            transactionReceipt = web3.eth.getTransactionReceipt(txHash);
            console.log(`Transaction hash: + ${txHash}`);
            sleep(expectedBlockTime);
          }

          // Hide spinner
          setSpinnerHidden(true);
        }
      });
    });
  }

  async function getCurrentTournamentIndex() {
    let currentTournamentIndex = await betContract.methods.getCurrentTournamentIndex().call().then((res, err) => {
      if (!err) {
        setCurrentTournamentIndex(res); // Set current tournament
      }
      else {
        console.log(err);
      }
    });

    return currentTournamentIndex;
  }
  // Get a list of movies
  async function getTournamentsAsync(currentTournament) {

    let tournament = await betContract.methods.getCurrentTournament(currentTournament).call().then((res, err) => {

      if (!err) {
        setCurrentTournament(res);
      }
      else {
        console.log(err);
      }
    });

    return tournament;
  }

  // THIS FUNCTION IS RESPOSIBLE FOR ACTUALLY BETTING ON THE TOURNAMENT -----------------------------------------------------------------------------------
  async function participateInTournament(answer) {
    await participateInTourney(answer);     // This function will actually send an answer to the contract

    // Switch to second player
    if (ActivePlayerOne) {
      setActivePlayer(false);
      // Switch to first player 
    } else {
      setActivePlayer(true);
    }
  }

  // Update the UI if state was changed
  useEffect(() => {

    getCurrentTournamentIndex();                  // Get current index for the tournament
    getTournamentsAsync(currentTournamentIndex);  // Load current tournament

    //Get latest player @from stack overflow
    betContract.getPastEvents('PlayerAnswered', {
      filter: {}, // Using an array means OR: e.g. 20 or 23
      fromBlock: 0,
      toBlock: 'latest'
    }, function (error, events) { console.log(events); })
      .then(function (events) {
        console.log(events[0].returnValues.player) // same results as the optional callback above
        setLatesWinner(events[0].returnValues.player);
      });


    // Get block number
    web3.eth.getBlockNumber((err, res) => {
      if (!err) {
        setBlockNumber(res);
      } else {
        console.log(err);
      }
    });
  }, [waitingForMinedTransaction])


  return (
    <div className="App">

      {/* Top level content */}
      <header className="App-header">
        <Navigation currentPlayer={currentPlayer.address} blockNumber={blockNumber} tounamentIndex={currentTournamentIndex} />
      </header>

      {/* Body of the document */}
      <Container>
        <Row>

          {/* This will show spinner until transaction is mined */}
          <div hidden={waitingForMinedTransaction}>
            <h2>Waiting for transaction to be mined</h2>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>

          {/* List of tournaments */}
          
            <h4>Current Tournament</h4>
            {/* getCreatedTournamentsFromContract() */}
            <SingleTournament itemData={currentTournament}
              participateInTournament={participateInTournament}
            />
           
        
     
          <WinnersList winners={latestWinner} />

        </Row>


      </Container>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
