import { useEffect } from 'react';
import { Navbar, Nav, NavbarBrand } from 'react-bootstrap';
import { EthAddress } from "rimble-ui"; // Library recommende by ethereum.org for dApp UI development
import logo from './logo-icon.svg';
import './navigation.css';
function Navigation({ currentPlayer, blockNumber, tounamentIndex}) {

useEffect(()=>{

},[currentPlayer,tounamentIndex,blockNumber])
const checkContract = 'https://ropsten.etherscan.io/address/0x7382793CCf185324a7595FECd06A1A95Caf323b0';
    return (
        <Navbar>
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

                <EthAddress address={currentPlayer} />
                <Nav.Link>Tournament index:{tounamentIndex}</Nav.Link>
                <Nav.Link href={checkContract} target="_blank">Network stats</Nav.Link>
            </Nav>
            <Navbar.Text>block#</Navbar.Text>
            <Navbar.Text>{blockNumber}</Navbar.Text>

        </Navbar>
    )
}

export default Navigation;

