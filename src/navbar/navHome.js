import React from 'react';
import './navbar.css';
import logo from '../imagens/logoBibliotech.png'; 
import avatar from '../imagens/avatar.png';

class Navbar extends React.Component {
    render() {
    return (
        <nav>
            <img src={logo} alt="Logo"/> {/* Adiciona a imagem da logo */}
            <ul>
                <li><a href="/">Inicio</a></li>
                <li><a href="/home">Home</a></li>
                <form className="d-flex buscar" role="buscar">
                    <input className="form-control me-2" type="search" placeholder="Buscar livro/autor" aria-label="buscar"></input>
                    <button className="btn btn-outline-success" type="submit">Buscar</button>
                </form>
            </ul>
            <img src={avatar} alt="avatar" className='avatar'/> {/* Adiciona a imagem da logo */}
        </nav>
    );
}
}

export default Navbar;