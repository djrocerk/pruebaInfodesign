import { Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Layout = () => {
    return <div>
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href="Tramos">Tramos</Nav.Link>
                    <Nav.Link href="Cliente">Cliente</Nav.Link>
                    <Nav.Link href="Tramoscliente">Tramos cliente</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        <Outlet />
    </div>;
}

export default Layout;