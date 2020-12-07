import { ListGroup } from 'react-bootstrap';
import { Blockie, Box, Flex} from "rimble-ui";
// Pass item data inside the component
// This is stateless component the data is passed from the parent
function SingleWinner({ data }) {

    return (
        <ListGroup.Item>
            {/* Identify player with recommended Rimble component*/}
            <Flex >
            <Box color="white" p={1}>
                {/* <ListGroup.Item variant='success'> */}
                <Blockie
                    opts={{
                        seed: data[5],
                        color: "#dfe",
                        bgcolor: "#a71",
                        size: 15,
                        scale: 3,
                        spotcolor: "#000"
                    }}
                />
               
            </Box>

            <Box color="black" fontSize={4} p={3} width={[1, 1, 0.5]}>
            {data}
            </Box>
            </Flex>
           
        </ListGroup.Item>



    )
}

export default SingleWinner;