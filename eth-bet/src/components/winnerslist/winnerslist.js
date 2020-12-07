import { ListGroup } from 'react-bootstrap';
import SingleWinner from '../single_winner/singlewinner';
import { Flex, Box } from "rimble-ui";

// This component defines how the list of winners will looks like
// Receives props from App.js
function WinnersList({ winners }) {
    return (
        <Box width={1} color="black">
            <h1>Winners</h1>
          {winners.map((w) => <SingleWinner data={w} key={w + ' ' + Math.random()}/>)} 
        
    </Box>  
    )
}

export default WinnersList;