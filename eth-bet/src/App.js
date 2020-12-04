import { Container, Row, Col, ModalFooter } from 'react-bootstrap';
import { useState, useEffect } from 'react';
// ------------------------------------------------------------------App components imports
import Navigation from './components/navigation/navigation';
import TournamenList from './components/tournament_list/tournamenlist';
import WinnersList from './components/winnerslist/winnerslist';
// ----------------------------------------------------------------------------------------
import {web3, betContract, NETWORK_TYPE, player1, player2,betAddress} from './config'; // Backend imports
// ----------------------------------------------------------------------------------------
import './App.css';

const Tx = require('ethereumjs-tx').Transaction;


function App() {
  
  // Set first player as an avtive. Then switch back to the second
  const [ActivePlayerOne, setActivePlayer] = useState(true);

  // Block number
  const [ blockNumber, setBlockNumber] = useState('');

  const currentPlayer = ActivePlayerOne ? player1 : player2;
  
  // Store tournaments when loaded from the backend
  let [tournaments, setTournaments] = useState('');

  // This is a sample of how the data from the contract would looks like
  tournaments = [
    {key: '0xDA8F4421' + Math.random().toString().split('.').join('r'), minbet:5,title:"Upper bracket semifinal: Isurus vs Loto",players:2,correct:"Isurus",A:"Isurus",B:"Loto"}
  ];


  /** Player can participate in tournament
   * 
   * @param { answer } The answer recorded from the form 
   * @param { amount } This is hardcoded and value set to 5
   * 
   */


   // SEND ANSWER TO BACKEND ------------------------------------------------------------------------------------------------------------------------------------
async function participateInTourney(answer){
  web3.eth.getTransactionCount(currentPlayer.address, (err, txCount) => {
      
    // Transaction object
    const txObject = {
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(4680000), // Raise the gas limit to a much higher amount
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'wei')),
      to: betAddress,
      value:web3.utils.toHex(web3.utils.toWei('5', 'wei')),
      data: betContract.methods.participateInTourney(answer).encodeABI()
    }

    // Which network
    const tx = NETWORK_TYPE === 'private' ? new Tx(txObject) : new Tx(txObject, { 'chain': 'ropsten' });
    tx.sign(Buffer.from(currentPlayer == player1 ? player1.privateKey.substr(2) : player2.privateKey.substr(2), 'hex'))   // Suppose to be a private key

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
      console.log('err:', err, 'txHash:', txHash)
      if (!err) {
        console.log();
      }

      else{
        console.log(err);
      }
    })
  })
}

async function getCurrentTournamentIndex(){
  let currentTournamentIndex = await betContract.methods.getCurrentTournamentIndex().call().then(console.log);
  return currentTournamentIndex;
}
// Get a list of movies
async function getTournamentsAsync(currentTournament) {
  
  let tournament = await betContract.methods.getCurrentTournament(currentTournament).call();
  let tournamentsLoaded = [];
  for (let m of tournament) {

    tournamentsLoaded.push({key: '0xDA8F4421' + Math.random().toString().split('.').join('r'), minBet:m.minBet,title:m.name,players:m.maxPlayers,correct:m.correctResult,A:m.A,B:m.B});
  }

  setTournaments(tournamentsLoaded);     // Set state of the movie
}
  
// THIS FUNCTION IS RESPOSIBLE FOR ACTUALLY BETTING ON THE TOURNAMENT -----------------------------------------------------------------------------------
  function participateInTournament(answer) {

    participateInTourney(answer);     // This function will actually send an answer to the contract

    // Check switching mechanism between current and next player
    console.log(currentPlayer);
    // Switch to second player
    if(ActivePlayerOne){
      setActivePlayer(false);
    // Switch to first player 
    } else{
      setActivePlayer(true);
    }
  }

 async function getLenOfT(){
  let howManyTournaments =  await betContract.methods.getTournamentsCount().call();
  return howManyTournaments;
 }

  // Test call to functions here
  useEffect(() =>{

    // Get past events
    betContract.getPastEvents('AtLeastOneWinner','NoWinners', {
      filter: {}, // Using an array means OR: e.g. 20 or 23
      fromBlock: 0,
      toBlock: 'latest'
  }, function(error, events){ console.log(events); })
  .then(function(events){
      console.log(events) // same results as the optional callback above
  });

    // Get block number
    web3.eth.getBlockNumber((err,res) =>{
      if(!err){
        setBlockNumber(res);
      } else{
        console.log(err);
      }
    });
  },[blockNumber])

  // Dummy data for winners. Should be received from contract
  const winners = [{ key: 'sdfsdf', address: '0x00a6d02Aa0dF9EBE9FBE62F683eea474de0D3CFa', bank: '$100' },
  ];

  return (
    <div className="App">

      {/* Top level content */}
      <header className="App-header">
        <Navigation currentPlayer = {currentPlayer.address} blockNumber={blockNumber} />

      </header>

      {/* Body of the document */}
      <Container fluid>
        <Row className="justify-content-md-center">

          {/* Tournament participation form */}
          <Col md="auto">
            {/* Call backend with amount and answer */}
            {/* <ParticipantAnswerForm 
                participateInTournament={participateInTournament} /> */}
          </Col>
          <div></div>

          {/* List of tournaments */}
          <Col md="auto">
            <h4>Tournaments</h4>
            {/* getCreatedTournamentsFromContract() */}
            <TournamenList tournaments={tournaments}
              participateInTournament={participateInTournament}
            />
          </Col>

          <aside>
            <Col md="auto">
              <h4>Results</h4>
              {/* Pass winners data down to the child components */}
              <WinnersList winners={winners} />
            </Col>
          </aside>

        </Row>
        {/* Footer */}
        <ModalFooter fixed="bottom">
          <Col>ETH-BET 2020 @All Rights Reserved </Col>
        </ModalFooter>
      </Container>
    </div>
  );
}

export default App;
