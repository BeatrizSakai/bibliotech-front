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
    const navigate = useNavigate();
    const handleClose = () => setShow(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const [modalData, setModalData] = useState(null);

    const handleShow = (modalType, bookData) => {
        setModalType(modalType);
        setModalData(bookData);
        setShow(true);
    }

    const [data, setData] = useState([]);

    const getBooks = async () => {
        await axios.get("http://localhost:8080/books")
        .then((response) => {
            console.log("Books data received from API:", response.data.books);
            setData(response.data.books);
        }).catch((err) => {
            console.error(err);
        });
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            getBooks();
        }
    }, [navigate]);

    

    return (
        <>
            <div className="bodyHome">
                <Navbar />
                <div className="row row-cols-1 row-cols-md-5 cards">
                    {data.map(book => (
                        <div className="col" key={book.id}>
                            <div className="card cardH" onClick={() => handleShow('mostrarLivro', book)}>
                                <img 
                                    className="imgLivro" 
                                    src={book.imageUrl ? book.imageUrl : imgLivro} 
                                    alt={book.titulo}
                                    onError={(e) => { e.target.onerror = null; e.target.src = imgLivro; }}
                                />
                                <div className="card-body">
                                    <h6 className="card-title">{book.titulo}</h6>
                                    <p className="card-text">{book.autor}</p>
                                    <button 
                                        variant="primary" 
                                        className="btn btn-primary btnReservar" 
                                        onClick={() => handleShow('reservar', book)}
                                    >
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
                            <img 
                                className="imgLivro" 
                                src={modalData.imageUrl} 
                                alt={modalData.titulo}
                            />
                            <div className="conteudoModal">
                                <h6>Título: {modalData.titulo}</h6>
                                <p>Autor(a): {modalData.autor}</p>
                                <p>Ano de Publicação: {modalData.ano_publicacao}</p>
                                <p>Gênero: {modalData.genero}</p>
                                <p>Sinopse: {modalData.sinopse}</p>
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
            
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </>
    );
}

export default HomePage;
