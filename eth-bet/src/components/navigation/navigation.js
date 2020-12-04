import { Navbar, Nav, NavbarBrand } from 'react-bootstrap';
import logo from './logo-icon.svg';
function Navigation({ currentPlayer, blockNumber, tounamentIndex }) {

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
                <img
                    alt=""
                    src={logo}
                    width="32"
                    height="32"
                    className="d-inline-block align-top"
                />{' '}ETH-BET
        </Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link>Player:</Nav.Link>
            <Nav.Link>{currentPlayer}</Nav.Link>
            <Nav.Link>Tournament index:{tounamentIndex}</Nav.Link>
        </Nav>
            <Navbar.Text>block#</Navbar.Text>
            <Navbar.Text>{blockNumber}</Navbar.Text>

        </Navbar>
    )
}

export default Navigation;

