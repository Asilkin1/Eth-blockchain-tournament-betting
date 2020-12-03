import { Container, Row, Col, ModalFooter } from 'react-bootstrap';
import { useState, useEffect } from 'react';
// ------------------------------------------------------------------App components imports
import Navigation from './components/navigation/navigation';
import TournamenList from './components/tournament_list/tournamenlist';
import WinnersList from './components/winnerslist/winnerslist';
// ----------------------------------------------------------------------------------------
import { web3, betContract, betAddress } from './config'; // Backend imports
// ----------------------------------------------------------------------------------------
import {
  getAccounts,
  getTournamentsLeftAsync,
  getTournamentDataAsync,
  getTournamentsCount,
  concludeTournament,
  participateInTourney
} from './BetContractAPI';

import './App.css';

function App() {
  
  // Set players wallets by index in the wallet-provider
  const [player1, setPlayerOne] = useState(web3.eth.accounts[0]);
  const [player2, setPlayerTwo] = useState(web3.eth.accounts[1]);

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

   // Can change to async
  function participateInTournament(answer, amount) {

    betContract.methods.participateInTourney(function (error, result) {
      web3.eth.sendAsync({
        from: currentPlayer.toString(),           // Here have to switch which player is sending an answer
        to: betAddress,
        value: amount,
      }, function (err, transactionHash) {
        if (!err) {
          console.log(result)
        }
        else {
          console.log(error);
        }
      })
    })

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
  useEffect(() => {
    // Call function to populate all of the tournaments
    setTournaments();
  }, [])

 

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
