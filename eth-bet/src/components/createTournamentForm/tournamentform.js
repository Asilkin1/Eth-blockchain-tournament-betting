import  {Form, Button, Container } from 'react-bootstrap';

function TournamentForm() {

    // Create state for the form
    return (
    <Container>
        {/* Form submit event handler */}
        <Form onSubmit={(e) => console.log(e) }>
            <h4>Create tournament</h4>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Tournament name</Form.Label>
            <Form.Control type="text" placeholder="tournament name" />
        </Form.Group>

        <Form.Group controlId="formBasicText">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="game" />
        </Form.Group>

        <Form.Group controlId="formBasicText">
            <Form.Label>Winning condition</Form.Label>
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
