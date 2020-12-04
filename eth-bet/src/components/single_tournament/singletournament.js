import { Jumbotron, Col, Row, ListGroup, Badge, Button } from 'react-bootstrap';

// Pass item data inside the component
// This is stateless component the data is passed from the parent
function SingleTournament({ itemData, participateInTournament }) {

    function onClick(e) {
        console.log("Answer selected " + e.target.value + "key: ");
        // Send choice back to the contract with minimumVlaue
        participateInTournament(e.target.value);
        alert('answer selected is: ' + e.target.value);
    }

    return (

        <Jumbotron>
            <h1>{itemData.title}</h1>
            <Col>
            <h2><Badge variant='primary'></Badge></h2></Col>
            <Button disabled block variant="info">
                Maximum participants <Badge variant="light">{itemData.players}</Badge> 
            </Button>

            <Button disabled block variant="info">
                Minimum bet <Badge variant="light">{itemData.minbet}</Badge> 
            </Button>
            
            <Row md="12">
                {/* Choice A */}
                <Col><Button block size="lg" variant="warning" onClick={onClick} value={itemData.A}>{itemData.A}</Button></Col>

                {/* Choice B */}
                <Col><Button block size="lg" variant="danger" onClick={onClick} value={itemData.B}>{itemData.B}</Button></Col>
            </Row>

            <p>Tournament:{itemData.key}</p>
        </Jumbotron>

    )
}

export default SingleTournament;