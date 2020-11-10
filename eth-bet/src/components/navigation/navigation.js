import { Navbar } from 'react-bootstrap';

function Navigation() {

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
                <img
                    alt=""
                    src='logo-icon.svg'
                    width="32"
                    height="32"
                    className="d-inline-block align-top"
                />
         ETH-BET
        </Navbar.Brand>
            <Navbar.Text >
                Tournament-driven decentralized betting app
        </Navbar.Text>
        </Navbar>
    )
}

export default Navigation;

