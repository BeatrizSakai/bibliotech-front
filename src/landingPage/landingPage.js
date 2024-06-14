import React from "react";
import './landingPage.css';
import Navbar from "../navbar/navbar";
import vetor from '../imagens/vetor.png'
import imagem from '../imagens/imgLanding.png'
import estrelas from '../imagens/Estrelas.png'
import footerImage from '../imagens/footer.png'
import livro1 from '../imagens/livro1.jpg'
import livro2 from '../imagens/livro2.jpg'
import livro3 from '../imagens/livro3.jpg'
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
                                        <a href="./home">
                                            <button  className="btn btn-primary btn1 botao"  >
                                                Comece Agora
                                            </button>  
                                        </a>
                                        
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
                                <a href="./home">
                                    <div className="card">
                                        <img className="imgLivro" src={livro1} alt="imgLivro" /> 
                                        <div className="card-body">
                                            <h5 className="card-title">O grande Gatsby</h5>
                                            <p className="card-text">F. Scott Fitzgerald</p>
                                        </div>
                                    </div>
                                </a>
                                
                            </div>
                            <div className="col">
                                <a href="./home">
                                    <div className="card" >
                                    <img className="imgLivro" src={livro2} alt="imgLivro" />
                                    <div className="card-body">
                                        <h5 className="card-title">Crepúsculo</h5>
                                        <p className="card-text">Stephenie Meyer</p>
                                    </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col">
                                <a href="./home">
                                    <div className="card">
                                        <img className="imgLivro" src={livro3} alt="imgLivro" /> {/* Adiciona a imagem da logo */}
                                        <div className="card-body">
                                            <h5 className="card-title">Outsider</h5>
                                            <p className="card-text">Stephen King</p>
                                        </div>
                                    </div>
                                </a>
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