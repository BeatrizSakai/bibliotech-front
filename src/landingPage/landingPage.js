import React from "react";
import './landingPage.css';
import Navbar from "../navbar/navbar";
import vetor from '../imagens/vetor.png'
import imagem from '../imagens/imgLanding.png'
import estrelas from '../imagens/Estrelas.png'
import livros from '../imagens/livros.png'
import imgLivro from '../imagens/imgLivro.png'
import footerImage from '../imagens/footer.png'

class LandingPage extends React.Component {
    render(){
        return (
            <div className="bodyLanding">
                <Navbar />
                <div>
                    <div className="conteudo">
                            <div className="conteudoEsq">
                                <img className="vetor" src={vetor} alt="vetor" /> {/* Adiciona a imagem da logo */} 
                                <div className="text">
                                    <h1>
                                    Conheça a Biblioteca Digital:
                                    </h1>
                                    <p className="paragrafo">
                                    Encontre seu próximo livro favorito em nossa coleção cuidadosamente selecionada. Com uma interface amigável e ferramentas de busca poderosas, descubra uma nova maneira de explorar o mundo do conhecimento. Junte-se a nós e desbloqueie um universo de aprendizado ao seu alcance.
                                    </p>
                                    <div className="botoes">
                                        <button  className="btn btn-primary btn1" href="/login" >
                                        Comece Agora
                                        </button>  
                                    </div>
                                </div>
                            </div>
                            <div className="conteudoDir">
                                <img className="imagem" src={imagem} alt="imagem" /> {/* Adiciona a imagem da logo */} 
                            </div>
                    </div>
                    <div className="texto">
                        <img className="estrelas estrela1" src={estrelas} alt="estrelas" /> {/* Adiciona a imagem da logo */} 
                        <h1>
                            Destaques BiblioTech
                        </h1>
                        <img className="estrelas estrela2" src={estrelas} alt="estrelas" /> {/* Adiciona a imagem da logo */}
                        <div> 
                        </div>
                        <div className="row row-cols-1 row-cols-md-3 g-4 cards">
                            <div className="col">
                                <div className="card">
                                <img className="imgLivro" src={imgLivro} alt="imgLivro" /> {/* Adiciona a imagem da logo */}
                                <div className="card-body">
                                    <h5 className="card-title">Harry Potter e a Pedra Filosofal</h5>
                                    <p className="card-text">TJ.K. Rowling</p>
                                </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                <img className="imgLivro" src={imgLivro} alt="imgLivro" /> {/* Adiciona a imagem da logo */}
                                <div className="card-body">
                                    <h5 className="card-title">Harry Potter e a Pedra Filosofal</h5>
                                    <p className="card-text">TJ.K. Rowling</p>
                                </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <img className="imgLivro" src={imgLivro} alt="imgLivro" /> {/* Adiciona a imagem da logo */}
                                    <div className="card-body">
                                        <h5 className="card-title">Harry Potter e a Pedra Filosofal</h5>
                                        <p className="card-text">J.K. Rowling</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <footer>
                    <img className="footerImage" src={footerImage} alt="footerImage" /> {/* Adiciona a imagem da logo */}
                </footer>
                
            </div>
            
        )
    }
}

export default LandingPage;