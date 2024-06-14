import React, { useState } from 'react';
import './navbar.css';
import logo from '../imagens/logoBibliotech.png'; 
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import menu from '../imagens/menu.png'; 
import { useNavigate, useLocation } from 'react-router-dom';

function NavHome({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <>
            {[false].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
                    <nav>
                        <Container fluid>
                            <Navbar.Brand href="#"><img src={logo} alt="Logo" /></Navbar.Brand>
                            <a className='links' href="/">Inicio</a>
                            <a className='links' href="/home">Home</a>
                            {location.pathname !== '/perfil' && (
                                <form className="d-flex buscar" onSubmit={handleSearchSubmit}>
                                    <input
                                        className="form-control me-2 barra"
                                        type="search"
                                        placeholder="Buscar livro/autor"
                                        aria-label="buscar"
                                        value={searchTerm}
                                        onChange={handleInputChange}
                                    />
                                    <button className="btn btn-outline-success" type="submit">Buscar</button>
                                </form>
                            )}
                            <DropdownButton className="ms-auto" align="end" title={<img className='menuImg' src={menu} alt="menu" />}>
                                <Dropdown.Item eventKey="1" href='/perfil'>Meu perfil</Dropdown.Item>
                                <Dropdown.Item eventKey="2" href='/meusEmprestimos'>Meus empréstimos</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout} eventKey="4">Sair</Dropdown.Item>
                            </DropdownButton>
                        </Container>
                    </nav>
                </Navbar>
            ))}
        </>
    );
}

export default NavHome;
