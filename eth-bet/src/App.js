import { Container, Row, Col, ModalFooter } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Tx from 'ethereumjs-tx';
// ------------------------------------------------------------------App components imports
import Navigation from './components/navigation/navigation';
import TournamenList from './components/tournament_list/tournamenlist';
import WinnersList from './components/winnerslist/winnerslist';
// ----------------------------------------------------------------------------------------
import {web3, betContract, NETWORK_TYPE} from './config'; // Backend imports
// ----------------------------------------------------------------------------------------

import './App.css';

function App() {
  
  // Set players wallets by index in the wallet-provider
  const [player1, setPlayerOne] = useState('');
  const [player1Private, setPlayerOnePrivate] = useState('');
  const [player2, setPlayerTwo] = useState('');
  const [player2Private, setPlayerTwoPrivate] = useState('');

  // Set first player as an avtive. Then switch back to the second
  const [ActivePlayerOne, setActivePlayer] = useState(true);

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
  web3.eth.getTransactionCount(currentPlayer, (err, txCount) => {
    
    // Transaction object
    const txObject = {
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(468000), // Raise the gas limit to a much higher amount
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'wei')),
      to: betContract,
      data: betContract.methods.participateInTourney(answer).encodeABI()
    }

    // Which network
    const tx = NETWORK_TYPE === 'private' ? new Tx(txObject) : new Tx(txObject, { 'chain': 'ropsten' });
    tx.sign(Buffer.from(currentPlayer == player1 ? player1Private.substr(2) : player2Private.substr(2), 'hex'))   // Suppose to be a private key

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
  
// THIS FUNCTION IS RESPOSIBLE FOR ACTUALLY BETTING ON THE TOURNAMENT -----------------------------------------------------------------------------------
  function participateInTournament(answer) {

    //participateInTourney(answer);     // This function will actually send an answer to the contract

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

  // Connecting to backend
  // Test call to functions here
  useEffect(() =>{
          // Try connect to web3
          try{
            // Set account one and two
            web3.eth.getAccounts().then( account => {
              setPlayerOne(account[0]);
              setPlayerTwo(account[1]);
            });
            // Get account from web3
            console.log(web3.eth.getAccounts());
           
    
          } catch(error){
            alert(`Failed to load web3, accounts, or contract.Check console for details`);
            console.log(error);
    }

     // print accounts
     console.log(player1);
     console.log(player2);
  },[])

  // Dummy data for winners. Should be received from contract
  const winners = [{ key: 'sdfsdf', address: '0x00a6d02Aa0dF9EBE9FBE62F683eea474de0D3CFa', bank: '$100' },
  ];

  return (
    <div className="App">

      {/* Top level content */}
      <header className="App-header">
        <Navigation />

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
        <ModalFooter>
          <Col>ETH-BET 2020 @All Rights Reserved </Col>
        </ModalFooter>
      </Container>


    </div>
  );
}

export default App;
