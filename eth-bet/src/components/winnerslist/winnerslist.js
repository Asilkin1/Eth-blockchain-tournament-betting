import { ListGroup } from 'react-bootstrap';
import SingleWinner from '../single_winner/singlewinner';
import { Flex, Box } from "rimble-ui";

// This component defines how the list of winners will looks like
// Receives props from App.js
function WinnersList({ winners }) {
    // Pass props further down to each child component
    const winnersList = [];
    winnersList.push(winners);
    return (
        <Box width={1} color="white">
            <h4>Recent winner</h4>
        <SingleWinner data={winnersList} />
        {console.log(winners)}
    </Box>
        
    )
}

export default WinnersList;