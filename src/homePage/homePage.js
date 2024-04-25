import React from "react";
import './homePage.css'
import Navbar from "../navbar/navHome";
import imgLivro from '../imagens/imgLivro.jpg';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function HomePage() {
    const [show, setShow] = useState(false);
    const [modalType, setModalType] = useState('livro'); // Estado para controlar qual modal deve ser exibido

    const handleClose = () => setShow(false);

    const handleShow = (type) => {
        setShow(true);
        setModalType(type); // Define qual modal deve ser exibido com base no parâmetro type
    };
    
    return (
        <>
            <div className="bodyHome">
                        <Navbar />
                        <div className="row row-cols-1 row-cols-md-5 cards">
                                <div className="col">
                                    <div className="card cardH" onClick={() => handleShow('mostrarLivro')}>
                                    <img className="imgLivro" src={imgLivro} alt="imgLivro" /> {/* Adiciona a imagem da logo */}
                                    <div className="card-body">
                                        <h6 className="card-title">Harry Potter e a Pedra Filosofal</h6>
                                        <p className="card-text">TJ.K. Rowling</p>
                                        <button variant="primary" className="btn btn-primary btnReservar" onClick={() => handleShow('reservar')}>
                                        Reservar
                                        </button> 
                                    </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card cardH" onClick={() => handleShow('mostrarLivro')}>
                                    <img className="imgLivro" src={imgLivro} alt="imgLivro" /> {/* Adiciona a imagem da logo */}
                                    <div className="card-body" >
                                        <h6 className="card-title">Harry Potter e a Pedra Filosofal</h6>
                                        <p className="card-text">TJ.K. Rowling</p>
                                        <button type="button" className="btn btn-primary btnReservar" onClick={() => handleShow('reservar')}>
                                        Reservar
                                        </button> 
                                    </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card cardH" onClick={() => handleShow('mostrarLivro')}>
                                        <img className="imgLivro" src={imgLivro} alt="imgLivro" /> {/* Adiciona a imagem da logo */}
                                        <div className="card-body">
                                            <h6 className="card-title">Harry Potter e a Pedra Filosofal</h6>
                                            <p className="card-text">J.K. Rowling</p>
                                            <button type="button" className="btn btn-primary btnReservar" onClick={() => handleShow('reservar')}>
                                        Reservar
                                        </button> 
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card cardH" onClick={() => handleShow('mostrarLivro')}>
                                        <img className="imgLivro" src={imgLivro} alt="imgLivro" /> {/* Adiciona a imagem da logo */}
                                        <div className="card-body">
                                            <h6 className="card-title">Harry Potter e a Pedra Filosofal</h6>
                                            <p className="card-text">J.K. Rowling</p>
                                            <button type="button" className="btn btn-primary btnReservar" onClick={() => handleShow('reservar')}>
                                        Reservar
                                        </button> 
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card cardH" onClick={() => handleShow('mostrarLivro')}>
                                        <img className="imgLivro" src={imgLivro} alt="imgLivro" /> {/* Adiciona a imagem da logo */}
                                        <div className="card-body">
                                            <h6 className="card-title">Harry Potter e a Pedra Filosofal</h6>
                                            <p className="card-text">J.K. Rowling</p>
                                            <button type="button" className="btn btn-primary btnReservar" onClick={() => handleShow('reservar')}>
                                        Reservar
                                        </button> 
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card cardH" onClick={() => handleShow('mostrarLivro')}>
                                        <img className="imgLivro" src={imgLivro} alt="imgLivro" /> {/* Adiciona a imagem da logo */}
                                        <div className="card-body">
                                            <h6 className="card-title">Harry Potter e a Pedra Filosofal</h6>
                                            <p className="card-text">J.K. Rowling</p>
                                            <button type="button" className="btn btn-primary btnReservar" onClick={() => handleShow('reservar')}>
                                        Reservar
                                        </button> 
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card cardH" onClick={() => handleShow('mostrarLivro')}>
                                        <img className="imgLivro" src={imgLivro} alt="imgLivro" /> {/* Adiciona a imagem da logo */}
                                        <div className="card-body">
                                            <h6 className="card-title">Harry Potter e a Pedra Filosofal</h6>
                                            <p className="card-text">J.K. Rowling</p>
                                            <button type="button" className="btn btn-primary btnReservar" onClick={() => handleShow('reservar')}>
                                        Reservar
                                        </button> 
                                        </div>
                                    </div>
                                </div>
                            </div>
            </div>
            <Modal show={show && modalType === 'reservar'} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reservar Livro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Data da reserva</Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Data da devolução</Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                    Reservar
                    </Button>
                </Modal.Footer>
                </Modal>
                <Modal show={show && modalType === 'mostrarLivro'} onHide={handleClose} >
                    <Modal.Header closeButton>
                        <Modal.Title>Livro</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modalInfo">
                        <img className="imgLivro" src={imgLivro} alt="imgLivro" /> {/* Adiciona a imagem da logo */}
                        <div className="conteudoModal">
                            <h6>Título: Harry Potter e a Pedra Filosofal</h6>
                            <p >Autor(a): J.K. Rowling</p>
                            <p>Ano de Publicação: 1997</p>
                            <p>Idioma: Português-BR</p>
                            <p>Gênero: Aventura</p>
                            <p>Número de páginas: 264</p>
                            <p>Quantidade: 5</p>
                        </div>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                        </Button>
                        <Button variant="primary"  onClick={() => handleShow('reservar')}>
                        Reservar
                        </Button>
                    </Modal.Footer>
                </Modal>
        </>
    );
}

export default HomePage;