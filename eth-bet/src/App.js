import { Spinner, Container, Row, Col, ModalFooter } from 'react-bootstrap';
import { useState, useEffect } from 'react';

// ------------------------------------------------------------------App components imports
import Navigation from './components/navigation/navigation';
import WinnersList from './components/winnerslist/winnerslist';
// ----------------------------------------------------------------------------------------
import { web3, betContract, NETWORK_TYPE, player1, player2, betAddress } from './config'; // Backend imports
// ----------------------------------------------------------------------------------------
import './App.css';
import SingleTournament from './components/single_tournament/singletournament';

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
        gasLimit: web3.utils.toHex(6700000), // Raise the gas limit to a much higher amount
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'wei') * 1.40),
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
        console.log(parseInt(res)); // Prints tournament object
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
  function participateInTournament(answer) {
    participateInTourney(answer);     // This function will actually send an answer to the contract
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

    //Get latest player from stack overflow
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
  }, [blockNumber, currentTournamentIndex,waitingForMinedTransaction])


  return (
    <div className="App">

      {/* Top level content */}
      <header className="App-header">
        <Navigation currentPlayer={currentPlayer.address} blockNumber={blockNumber} tounamentIndex={currentTournamentIndex} />

      </header>

      {/* Body of the document */}
      <Container fluid>
        <Row className="justify-content-md-center">

        {/* This will show spinner until transaction is mined */}
          <div hidden={waitingForMinedTransaction}>
            <h2>Waiting for transaction to be mined</h2>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>

          {/* List of tournaments */}
          <Col md="auto">
            <h4>Current Tournament</h4>
            {/* getCreatedTournamentsFromContract() */}
            <SingleTournament itemData={currentTournament}
              participateInTournament={participateInTournament}
            />
          </Col>

          <Col>
            <h4>Recent winners</h4>
            <WinnersList winners={latestWinner} />
          </Col>

        </Row>

      </Container>
      {/* Footer */}
      <ModalFooter>
        <Row>
          <Col>
            <h6>Description</h6>
            <p>Decentralized e-sport betting application</p>
          </Col>
          <Col>
            <h6>How it works</h6>
            <p>See Bet.sol</p>
          </Col>
          <Col>
            <h6>Where to expand</h6>
            <p>Get real data from e-sport APIs</p>
          </Col>
        </Row>



      </ModalFooter>
    </div>
  );
}

export default App;
