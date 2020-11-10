import { Form, Button, Container } from 'react-bootstrap';
import { useState} from 'react';

// Pass a function which gathers data from this component
function TournamentForm({ create }) {

    const [name,setName] = useState('');
    const [title,setTitle] = useState('');

    function onValueChangeName(e){
        setName(e.target.value);
        console.log(name);
    }

    function onValueChangeTitle(e){
        setTitle(e.target.value);
        console.log(title);
    }

    function onSubmit(e) {
        console.log("calling form creation from tournamentform.js");
        // Form is not empty
        if(name && title){
            // create form object
            const completeForm = {name,title}
            e.preventDefault();
            create(completeForm);
            setName('');
            setTitle('');
        }
    }
    // Create state for the form
    return (
        <Container>
            {/* Form submit event handler */}
            <Form onSubmit={onSubmit}>
                <h4>Create tournament</h4>
                <Form.Group controlId="formBasicText">
                    <Form.Label>Tournament name</Form.Label>
                    <Form.Control type="text" 
                                  placeholder="tournament name" 
                                  value={name}
                                  onChange={onValueChangeName}/>
                </Form.Group>
                <Form.Group controlId="formBasicText">
                    <Form.Control type="text" 
                                  placeholder="title" 
                                  value={title}
                                  onChange={onValueChangeTitle}/>
                </Form.Group>

                <Form.Group controlId="formBasicText">
                    <Form.Control type="text" 
                                  placeholder="type" />
                </Form.Group>

                <Button variant="primary" type="submit">Create</Button>
            </Form>
        </Container>
    )

}

export default TournamentForm;
