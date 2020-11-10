import  {Form, Button, Container } from 'react-bootstrap';

// Pass a function which gathers data from this component
function TournamentForm({createTournament}) {

    function newTournament(e){
        console.log(e.target.value)
    }
    // Create state for the form
    return (
    <Container>
        {/* Form submit event handler */}
        <Form onSubmit={ newTournament}>
            <h4>Create tournament</h4>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Tournament name</Form.Label>
            <Form.Control type="text" placeholder="tournament name"/>
        </Form.Group>
        <Form.Group controlId="formBasicText">
            <Form.Control type="text" placeholder="game" />
        </Form.Group>

        <Form.Group controlId="formBasicText">
            <Form.Control type="text" placeholder="type" />
        </Form.Group>

        <Button variant="primary" type="submit">
            Create
        </Button>
    </Form>
    </Container>
    )
        
}

export default TournamentForm;
