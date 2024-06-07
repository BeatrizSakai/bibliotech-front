import React from 'react';
import './navbar.css';
import logo from '../imagens/logoBibliotech.png'; 
class Navbar extends React.Component {
    render() {
    return (
        <nav class="cabecalho__container">
            <div className='content'>
               <img src={logo} alt="Logo" className='logo'/> {/* Adiciona a imagem da logo */}
                <li><a href="/home">Home</a></li>
                <li><a href="/login">Login</a></li>
            </div>
        </nav>
    );
}
}

export default Navbar;