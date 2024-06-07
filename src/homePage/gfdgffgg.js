import React, { useEffect, useState } from "react";
import './homePage.css';
import Navbar from "../navbar/navHome";
import imgLivro from '../imagens/imgLivro.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [show, setShow] = useState(false);
    const [modalType, setModalType] = useState('livro');
    const [modalData, setModalData] = useState(null);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);

    const handleShow = (modalType, bookData) => {
        setModalType(modalType);
        setModalData(bookData);
        setShow(true);
    }

    useEffect(() => {
        const token = localStorage.getItem('token'); // Obtem o token de autenticação
        if (!token) {
            navigate('/login'); // Redireciona para a página de login se não houver token
        } else {
            getBooks(); // Se houver token, carrega os livros
        }
    }, [navigate]);

    const getBooks = async () => {
        try {
            const response = await axios.get("http://localhost:8080/books", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Envia o token no cabeçalho da requisição
                }
            });
            setData(response.data.books);
        } catch (error) {
            console.error("Erro ao obter os livros:", error);
            alert("Erro ao obter os livros. Por favor, tente novamente mais tarde.");
        }
    }
    
    return (
        <>
            <div className="bodyHome">
                <Navbar />
                <div className="row row-cols-1 row-cols-md-5 cards">
                    {data.map(book => (
                        <div className="col" key={book.id}>
                            <div className="card cardH" onClick={() => handleShow('mostrarLivro', book)}>
                                <img className="imgLivro" src={imgLivro} alt="imgLivro" />
                                <div className="card-body">
                                    <h6 className="card-title">{book.titulo}</h6>
                                    <p className="card-text">{book.autor}</p>
                                    <button variant="primary" className="btn btn-primary btnReservar" onClick={() => handleShow('reservar')}>
                                        Reservar
                                    </button> 
                                </div>
                            </div>
                        </div>
                    ))}
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
            <Modal show={show && modalType === 'mostrarLivro'} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Livro</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalInfo">
                    {modalData && (
                        <>
                            <img className="imgLivro" src={imgLivro} alt="imgLivro" />
                            <div className="conteudoModal">
                                <h6>Título: {modalData.titulo}</h6>
                                <p>Autor(a): {modalData.autor}</p>
                                <p>Ano de Publicação: {modalData.ano_publicacao}</p>
                                <p>Gênero: {modalData.genero}</p>
                                <p>Sinopse: {modalData.sinopse}</p>
                                <p>Número de páginas: {modalData.numeroPaginas}</p>
                                <p>Quantidade: {modalData.quantidade}</p>
                            </div>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => handleShow('reservar')}>
                        Reservar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default HomePage;
