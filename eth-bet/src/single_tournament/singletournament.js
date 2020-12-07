import { Jumbotron, Col, Row, Badge } from 'react-bootstrap';
import './St.css';
import { Flex, Box, Text, Heading, Pill, Button } from "rimble-ui";

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
            <Heading>{itemData._name}</Heading>
     
                <Pill color="primary-light"><Text fontSize={2} m={10} p={10}>Players: {itemData.max_players}</Text></Pill>
                <Pill color="danger"><Text fontSize={2} m={10} p={10}>Bet: {itemData._minBet} wei</Text></Pill>
    
                {/* Choice A */}
                <Col><Button size="lg" variant="warning" onClick={onClick} value={itemData.a}>{itemData.a}</Button></Col>

                {/* Choice B */}
                <Col><Button size="lg" variant="danger" onClick={onClick} value={itemData.b}>{itemData.b}</Button></Col>

           
        </Jumbotron>

    )
}

export default SingleTournament;