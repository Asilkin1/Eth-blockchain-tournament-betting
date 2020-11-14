import { Form, Button, Container } from 'react-bootstrap';
import { useState} from 'react';

// Pass a function which gathers data from this component
function ParticipantAnswerForm({ participateInTournament }) {

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

    /**
     * 
     * @param {e} event we catch when the form is submitted
     *  
     */
    function onSubmit(e) {
        // Form is not empty
        if(name && title){
            participateInTournament(e.target.name,e.target.title);
            console.log(`Answer is ${name} and amount is equal to ${title}`);
            setName('');
            setTitle('');
            e.preventDefault();
        }
    }
    // Create state for the form
    return (
        <Container>
            {/* Form submit event handler */}
            <Form onSubmit={onSubmit}>
                <h4>Participate</h4>
                <Form.Group controlId="formBasicText">
                    <Form.Label>Answer</Form.Label>
                    <Form.Control type="text" 
                                  placeholder="answer" 
                                  value={name}
                                  onChange={onValueChangeName}/>
                </Form.Group>
                <Form.Label>Bet amount</Form.Label>
                <Form.Group controlId="formBasicNumber">
                    <Form.Control type="number" 
                                  placeholder="amount" 
                                  value={title}
                                  onChange={onValueChangeTitle}/>
                </Form.Group>

                <Button variant="primary" type="submit">Create</Button>
            </Form>
        </Container>
    )

}

export default ParticipantAnswerForm;
