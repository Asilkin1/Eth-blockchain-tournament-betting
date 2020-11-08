import { Navbar } from 'react-bootstrap';

function Navigation() {

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
                <img
                    alt=""
                    src="betting.png"
                    className="d-inline-block align-top"
                />{' '}
         ETH-BET
        </Navbar.Brand>
        <Navbar.Text >
           Tournament-driven decentralized betting app
        </Navbar.Text>
        </Navbar>
    )
}

export default Navigation;

