import React from "react";
import './perfil.css'
import Navbar from "../navbar/navHome";
import imgPerfil from '../imagens/imgPerfil.jpg';


function PerfilPage() {
    return (
        <>
            <div id="body">
                <Navbar />
                <div className="conteudo">
                    <div>
                        <img className="imgPerfil" src={imgPerfil} alt="imgPerfil" /> {/* Adiciona a imagem da logo */} 
                    </div>
                    <div>
                        <h1>
                            jnecsdunfisufvnisufvuf
                        </h1>
                    </div>
                </div>
            </div>
                
            
        </>
    );
}

export default PerfilPage;