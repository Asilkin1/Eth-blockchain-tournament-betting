import { Container, Row, Col, Button } from 'react-bootstrap';



function DebugWidget() {

    return (
        <Container>
            <Row>
                <Col><p>Functions:</p>
                <Row><Button>
                    createTournament()
                </Button></Row>
                
                <Row><Button>
                    concludeTournament()
                </Button></Row>
                
                </Col>
                
                <Col><p>Result:</p></Col>
            </Row>
            <Row>

            </Row>
        </Container>

    )
}


export default DebugWidget; 