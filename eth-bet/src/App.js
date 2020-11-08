import { Container, Row, Col, Button, ButtonGroup, Alert } from 'react-bootstrap';
import Navigation from './components/navigation/navigation';
import TournamentForm from './components/createTournamentForm/tournamentform';
import './App.css';

function App() {
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
            </Col>
          </Row>
        </Container>

      </Container>

    </div>
  );
}

export default App;
