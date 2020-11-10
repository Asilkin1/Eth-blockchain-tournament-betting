import { Container, Row, Col, Button, ButtonGroup, Alert } from 'react-bootstrap';
import Navigation from './components/navigation/navigation';
import TournamentForm from './components/createTournamentForm/tournamentform';
import TournamenList from './components/tournament_list/tournamenlist';
import './App.css';

function App() {

  // Dummy data. This should come from the contract
  // This data would be passed down to the child components
  const tournaments = [{key:1,title:'Call of Duty 4',type:'WTIA', condition:'MVP',creator:'0x333',rating:'4',players:'4',bank:'1'},
                       {key:2,title:'Plants vs Zombies',type:'WTIA', condition:'MVP',creator:'0x444',rating:'5',players:'2',bank:'1'},
                       {key:3,title:'Rocket League',type:'WTIA', condition:'MVP',creator:'0x333',rating:'4',players:'4',bank:'1'},
                       {key:4,title:'Rocket League',type:'WTIA', condition:'MVP',creator:'0x333',rating:'4',players:'4',bank:'1'},
                       {key:5,title:'Rocket League',type:'WTIA', condition:'MVP',creator:'0x333',rating:'4',players:'4',bank:'1'},
                       {key:6,title:'Rocket League',type:'WTIA', condition:'MVP',creator:'0x333',rating:'4',players:'4',bank:'1'}];

  return (
    <div className="App">
      <Container>
        <header className="App-header">
          <Navigation />
        </header>
        <Container>
          <Row>
            <Col md>
              <h4>Winners</h4>
                <Alert  variant='success'>
                Winner 1
                </Alert>
                <Alert  variant='success'>
                Winner 2
                </Alert>
                <Alert  variant='success'>
                Winner 3
                </Alert>
            </Col>
            <Col md>
              <TournamentForm />
            </Col>
            <Col md>
              <h4>Tournaments</h4>
              <ButtonGroup aria-label="Basic example">
                <Button variant="secondary">Active</Button>
                <Button variant="secondary">Past</Button>
              </ButtonGroup>

              {/* getCreatedTournamentsFromContract() */}
              <TournamenList tournaments={tournaments}/>
            </Col>
          </Row>
        </Container>

      </Container>

    </div>
  );
}

export default App;
