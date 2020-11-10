import { ListGroup } from 'react-bootstrap';
import SingleTournament from '../single_tournament/singletournament';

// This component defines how the list of tournaments will looks like
// Receives props from App.js
function TournamentList({ tournaments }) {
    // Pass props further down to each child component
    const currentTournaments = tournaments.map((e) => {
        // Unique key should be passed for each component in the list
        return <SingleTournament itemData={e} key={e.key}></SingleTournament>
    });
    return (
        <ListGroup>
            {currentTournaments}
        </ListGroup>
    )
}

export default TournamentList;