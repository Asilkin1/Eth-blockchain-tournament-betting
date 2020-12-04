import { Jumbotron, Col, Row, Badge, Button } from 'react-bootstrap';

// Pass item data inside the component
// This is stateless component the data is passed from the parent
function SingleTournament({
    itemData,
    participateInTournament }) {

    function onClick(e) {
        // Send choice back to the contract with minimumVlaue
        participateInTournament(e.target.value);
    }

    return (

        <Jumbotron>
            <h1>{itemData._name}</h1>
            <Col>
                <h2><Badge variant='primary'></Badge></h2></Col>
            <Button disabled block variant="info">
                Maximum participants <Badge variant="light">{itemData.max_players}</Badge>
            </Button>

            <Button disabled block variant="info">
                Minimum bet <Badge variant="light">{itemData._minbet}</Badge>
            </Button>

            <Row md="12">
                {/* Choice A */}
                <Col><Button block size="lg" variant="warning" onClick={onClick} value={itemData.a}>{itemData.a}</Button></Col>

                {/* Choice B */}
                <Col><Button block size="lg" variant="danger" onClick={onClick} value={itemData.b}>{itemData.b}</Button></Col>
            </Row>
        </Jumbotron>

    )
}

export default SingleTournament;