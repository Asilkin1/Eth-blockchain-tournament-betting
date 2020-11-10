import { ListGroup } from 'react-bootstrap';
import SingleWinner from '../single_winner/singlewinner';

// This component defines how the list of winners will looks like
// Receives props from App.js
function WinnersList({ winners }) {
    // Pass props further down to each child component
    const winnersList = winners.map((w) => {
        // Unique key should be passed for each component in the list
        return <SingleWinner data={w} key={w.key}></SingleWinner>
    });
    return (
        <ListGroup>
            {winnersList}
        </ListGroup>
    )
}

export default WinnersList;