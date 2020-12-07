import { ListGroup } from 'react-bootstrap';
import SingleWinner from '../single_winner/singlewinner';
import { Flex, Box } from "rimble-ui";

// This component defines how the list of winners will looks like
// Receives props from App.js
function WinnersList({ winners }) {
    // Pass props further down to each child component
    console.log(winners);


    return (
        <Box width={1} color="black">
            <h1>Winners</h1>
          {winners.map((w) => <SingleWinner data={w} key={winners[Math.random()]}/>)} 
        
    </Box>  
    )
}

export default WinnersList;