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
  getTournamentsLeft,
  getTournamentData,
  getTournamentsCount,
  concludeTournament,
  participateInTourney
} from './BetContractAPI';

import './App.css';

function App() {

  // Keep data about accounts
  const [accounts, setAccounts] = useState(getAccounts());

  // The way tournament object looks like
  let tournamentObject = {
    // Set unique key for each tournament
    key: '0xDA8F4421' + Math.random().toString().split('.').join('r'),
    title: '',
    players: '',
    bank: '',
    A: '',
    B: '',
    minBet: 5
  };

  // Store tournaments
  // const [tournaments, setTournaments] = useState('');

  // Convert to hex the portion of data
  // from https://stackoverflow.com/questions/21647928/javascript-unicode-string-to-hex
  function toHex(str, hex) {
    try {
      hex = unescape(encodeURIComponent(str))
        .split('').map(function (v) {
          return v.charCodeAt(0).toString(16)
        }).join('')
    }
    catch (e) {
      hex = str
      console.log('invalid text input: ' + str)
    }
    return hex
  }

  /** Player can participate in tournament
   * 
   * @param { answer } The answer recorded from the form 
   * @param { amount } How much player send to the contract
   * 
   */
  function participateInTournament(answer, amount) {

    betContract.methods.participateInTourney(function (error, result) {
      web3.eth.sendAsync({
        from: '0xB7060EdA50dF990C964fcC9A31078f8Cf624e277',
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
  }

  // Connecting to backend
  // Test call to functions here
  useEffect(() => {
    // Call function to populate all of the tournaments


  }, [])

  // Dummy data. This should come from the contract
  // This data would be passed down to the child components
  const tournaments = [
    { key: 1, title: 'Team A vs Team B', players: '4', bank: '1', A: 'Team A', B: 'Team B', minBet: 1 },
    { key: 2, title: 'Team C vs Team D', players: '4', bank: '1', A: 'Team C', B: 'Team D', minBet: 1 },
  ];

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
          <div>{accounts}</div>

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
