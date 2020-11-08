import  {Form, Button } from 'react-bootstrap';

function TournamentForm() {

    // Create state for the form
    return (
    
        <Form>
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
    </Form>)
}

export default TournamentForm;
