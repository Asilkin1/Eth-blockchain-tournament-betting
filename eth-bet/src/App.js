import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Navigation from './components/navigation/navigation';
import TournamentForm from './components/createTournamentForm/tournamentform';
import TournamenList from './components/tournament_list/tournamenlist';
import WinnersList from './components/winnerslist/winnerslist';
import {web3, NETWORK_TYPE, defaultAccount,betContract} from './config';

import './App.css';

// Pandascore API
const API_KEY='DK2LjnSOxsU4jIDbmPDpbo-kxaZUmpXAsiDRTufcstpifvxLyWI';
// Can use three files with .json extension
// PAST_.json - for past events
// RUNNING_.json - for running tournaments
// UPCOMING_.json - for upcoming tournaments

function App() {

// Create uniqID generator
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
  

  // Connecting to backend
  useEffect(() =>{
    const init = async() =>{
      // Try connect to web3
      try{
        console.log(web3.eth.getAccounts());
      } catch(error){
        alert(`Failed to load web3, accounts, or contract.Check console for details`);
        console.log(error);
      }

      // Call backend
      init();
    }
  })

  // Dummy data. This should come from the contract
  // This data would be passed down to the child components
  const tournaments = [{ key: 1, title: 'Call of Duty 4', type: 'WTIA', condition: 'MVP', creator: '0x333', rating: '4', players: '4', bank: '1' },
  { key: 2, title: 'Plants vs Zombies', type: 'WTIA', condition: 'MVP', creator: '0x444', rating: '5', players: '2', bank: '1' },
  { key:  3, title: 'Rocket League', type: 'WTIA', condition: 'MVP', creator: '0x333', rating: '4', players: '4', bank: '1' }];

  // Dummy data for winners. Should be received from contract
  const winners = [{ key: 'sdfsdf', address: '0x00a6d02Aa0dF9EBE9FBE62F683eea474de0D3CFa', bank: '$100' },
  { key: 'unique1', address: '0x00a6d02Aa0dF9EBE9FBE62F683eea474de0D334r', bank: '$16' },
  { key: 'unique2', address: '0x00a6d02Aa0dF9EBE9FBE62F683eea474de0D340r', bank: '$88' },
  { key: 'unique3', address: '0x00a6d02Aa0dF9EBE9FBE62F683eea474de0D3CFa', bank: '$12' },
  { key: 'unique4', address: '0x00a6d02Aa0dF9EBE9FBE62F683eea474de0D3CFa', bank: '$10' }];

  // Receive data from the form
  function createForm(content) {
    console.log("Create form" + content.name);
  }
  return (
    <div className="App">

      {/* Top level content */}
      <header className="App-header">
        <Navigation />
      </header>
      {/* Body of the document */}
      <Container fluid>
        <Row>
          {/* Tournament creation form */}
          <Col md={3}>
            <TournamentForm create={createForm} />
          </Col>

          {/* List of tournaments */}
          <Col md={3}>
            <h4>Tournaments</h4>
            {/* getCreatedTournamentsFromContract() */}
            <TournamenList tournaments={tournaments} />
          </Col>

          <Col md={3}>
            <h4>Winners</h4>
            {/* Pass winners data down to the child components */}
            <WinnersList winners={winners} />
          </Col>
        </Row>

    
      </Container>
  </div>
  );
}

export default App;
