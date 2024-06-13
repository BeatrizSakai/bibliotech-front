import React, { useState } from 'react';
import './navbar.css';
import logo from '../imagens/logoBibliotech.png'; 
import avatar from '../imagens/avatar.png';

function Navbar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <nav>
            <div className='content'>
                <img src={logo} alt="Logo"/> 
                <li><a href="/">Inicio</a></li>
                <li><a href="/home">Home</a></li>
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
                <button className="btn btn-primary">
                    <a href="/cadastroLivro">Cadastrar Livro</a>
                </button>
                <img src={avatar} alt="avatar" className='avatar'/>
            </div>
        </nav>
    );
}

export default Navbar;
