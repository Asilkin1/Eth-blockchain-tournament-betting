import { ListGroup } from 'react-bootstrap';
import SingleWinner from '../single_winner/singlewinner';

// This component defines how the list of winners will looks like
// Receives props from App.js
function WinnersList({ winners }) {
    // Pass props further down to each child component
    const winnersList = [];
    winnersList.push(winners);
    return (
        <ListGroup>
            {winnersList}
        </ListGroup>
    )
}

export default WinnersList;