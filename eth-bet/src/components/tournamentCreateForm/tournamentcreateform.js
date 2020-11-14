import { Form, Button, Container } from 'react-bootstrap';
import { useState} from 'react';

// Pass a function which gathers data from this component
function TournamentCreateForm({ createTournament }) {

    const [state, setTournament] = useState({minBet: '', name: '', maxPlayers: '',answer:''});

    const {minBet} = state;
    const {name} = state;
    const {maxPlayers} = state;
    const {answer} = state;

    function onValueChangeMinBet(e){
        setTournament({minBet: e.target.minBet});
        console.log(minBet);
    }

    function onValueChangeName(e){
        setTournament(minBet,e.target.name,maxPlayers,answer);
        console.log(name);
    }

    function onValueChangeMaxPlayers(e){
        setTournament(minBet,name,e.target.maxPlayers,answer);
        console.log(name);
    }

    function onValueChangeAnswer(e){
        setTournament(minBet,name,maxPlayers,e.target.answer);
        console.log(name);
    }
    /**
     * 
     * @param {e} event we catch on input change 
     */
   

    /**
     * 
     * @param {e} event we catch when the form is submitted
     *  
     */
    function onSubmit(e) {
        // Form is not empty
        if(minBet && name && maxPlayers && answer){
            createTournament(e.target.minBet,e.target.name,e.target.maxPlayers,e.target.answer);
            console.log(`Answer is ${name} and amount is equal to ${answer}`);
            e.preventDefault();
        }
    }
    // Create state for the form
    return (
        <Container>
            {/* Form submit event handler */}
            <Form onSubmit={onSubmit}>
                <h4>Create Tournament</h4>
                <Form.Group controlId="formBasicText">
                    <Form.Label>Tournament name</Form.Label>
                    <Form.Control type="text" 
                                  value={name}
                                  onChange={onValueChangeName}
                    />
                </Form.Group>
                <Form.Label>Minimum bet</Form.Label>
                <Form.Group controlId="formBasicNumber">
                    <Form.Control type="number"  
                                  value={minBet}
                                  onChange={onValueChangeMinBet}
                    />
                </Form.Group>
                <Form.Label>Max players</Form.Label>
                <Form.Group controlId="formBasicNumber">
                    <Form.Control type="number"  
                                  value={maxPlayers}
                                  onChange={onValueChangeMaxPlayers}
                    />
                </Form.Group>
                <Form.Label>Answer</Form.Label>
                <Form.Group controlId="formBasicNumber">
                    <Form.Control type="number"  
                                  value={answer}
                                  onChange={onValueChangeAnswer}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Create</Button>
            </Form>
        </Container>
    )

}

export default TournamentCreateForm;
