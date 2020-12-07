import { Spinner, Container, Row, Col, ModalFooter } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Flex, Box, Card, Heading, Text, Flash, ToastMessage } from "rimble-ui";

// ------------------------------------------------------------------App components imports
import Navigation from './components/navigation/navigation';
import WinnersList from './components/winnerslist/winnerslist';
import SingleTournament from './single_tournament/singletournament';
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

  // Show error toast
  const [showErrorToast, setErrorToast] = useState(true);

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
        gasLimit: web3.utils.toHex(240000), // Block gas limit
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'wei')), // Pretty good price, for fast execution
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
            setSpinnerHidden(true);
            transactionReceipt = web3.eth.getTransactionReceipt(txHash);
            console.log(`Transaction hash: + ${txHash}`);
            sleep(expectedBlockTime);
          }
        }

        // Cannot send transaction
        if (err) {
          setSpinnerHidden(true);
          setErrorToast(false);
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
    // Show some spinners for UI
    setSpinnerHidden(false);
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
        let winners = [];
        events.map((player) => {
          winners.push(player.returnValues.player); // Push winners from the event
        })

        setLatesWinner(winners);

      });

    // Get block number
    web3.eth.getBlockNumber((err, res) => {
      if (!err) {
        setBlockNumber(res);
      } else {
        console.log(err);
      }
    });
  }, [blockNumber,currentPlayer,currentTournamentIndex])


  return (
    <div className="App">
      {/* Top level content */}
      <header className="App-header">
        <Navigation currentPlayer={currentPlayer.address} blockNumber={blockNumber} tounamentIndex={currentTournamentIndex} />
      </header>

    <Box><ToastMessage.Failure
        hidden={showErrorToast}
        my={3}
        message={"Transaction failed"}
      /></Box>
      
    <Box><ToastMessage.Processing hidden={waitingForMinedTransaction} my={3} message={"Processing 0.00018 ETH payment"} /></Box>
      
      <Flex>

        {/* List of tournaments */}
        <Col>
          <h4>Current Tournament</h4>
          {/* getCreatedTournamentsFromContract() */}
          <SingleTournament itemData={currentTournament}
            participateInTournament={participateInTournament}
          />

          <Card width={"auto"} maxWidth={"400px"} mx={"auto"} px={[3, 3, 4]}>
            <Heading>Smart contract</Heading>

            <Box>
              <Text mb={4} fontSize={1} textAlign="justify">
                1. Creates 6 tournaments<br></br>
              2. Accept an answer<br></br>
              3. Compare the received answer with correct answer<br></br>
              4. If correct, then add player to a list of winners<br></br>
              5. Decide when the tournament should be concluded<br></br>
              6. Send money to winners<br></br>
              7. If no one won, send money back<br></br>
              </Text>
            </Box>
          </Card>

          <Card width={"auto"} maxWidth={"400px"} mx={"auto"} px={[3, 3, 4]}>
            <Heading>Features</Heading>
            <Box>
              <Text mb={4} fontSize={1} textAlign="justify">
                1. Bet on a tournament winner<br></br>
              2. Send funds to your wallet<br></br>
              3. Check transaction status on etherscan<br></br>
              4. Populate a list of winners<br></br>
              5. Generate identicons for Ethereum addresses<br></br>
              6. Populate current block number<br></br>
              7. Switch between player 1 and player 2
              </Text>
            </Box>
          </Card>
        </Col>
        <Col>
         
          {/* Add conditional rendering */}
        {latestWinner.length > 0 &&
        <Box><WinnersList winners={latestWinner} /></Box>
        }
        </Col>
      </Flex>
    </div>
  );
}

export default App;
