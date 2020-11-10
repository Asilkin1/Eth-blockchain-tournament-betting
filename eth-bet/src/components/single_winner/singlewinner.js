import { ListGroup } from 'react-bootstrap';

// Pass item data inside the component
// This is stateless component the data is passed from the parent
function SingleWinner({ data }) {

    return (
        // Show winner's address and bank
        <ListGroup.Item variant='success'>
         <p color="Yellow">{data.address}</p>
         {data.bank}
        </ListGroup.Item>

    )
}

export default SingleWinner;