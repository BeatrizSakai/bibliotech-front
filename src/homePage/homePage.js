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
    const [editData, setEditData] = useState({});
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleShow = (modalType, bookData) => {
        setModalType(modalType);
        setModalData(bookData);
        setEditData(bookData || {}); // Iniciar o formulário de edição com os dados do livro
        setShow(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/books/${editData.id}`, editData);
            setShow(false);
            getBooks(); // Atualize a lista de livros após a edição
        } catch (error) {
            console.error("Erro ao editar livro:", error);
        }
    };

    const handleDeleteBook = (book) => {
        setBookToDelete(book);
        setShowDeleteModal(true);
    };

    const confirmDeleteBook = async () => {
        try {
            await axios.delete(`http://localhost:8080/books/${bookToDelete.id}`);
            setShowDeleteModal(false);
            getBooks(); // Atualize a lista de livros após a exclusão
        } catch (error) {
            console.error("Erro ao deletar livro:", error);
        }
    };

    const getBooks = async () => {
        await axios.get("http://localhost:8080/books")
        .then((response) => {
            console.log("Books data received from API:", response.data.books);
            setData(response.data.books);
            setFilteredData(response.data.books);
        }).catch((err) => {
            console.error(err);
        });
    };

    const handleSearch = (searchTerm) => {
        const filteredBooks = data.filter(book =>
            book.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.autor.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filteredBooks);
    };

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
                <Navbar onSearch={handleSearch} />
                <div className="row row-cols-1 row-cols-md-5 cards">
                    {filteredData.map(book => (
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
                    <Button variant="primary" onClick={() => handleShow('editarLivro', modalData)}>
                        Editar
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteBook(modalData)}>
                        Deletar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show && modalType === 'editarLivro'} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Livro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditSubmit}>
                        <Form.Group>
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="titulo"
                                value={editData.titulo || ''}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Autor</Form.Label>
                            <Form.Control
                                type="text"
                                name="autor"
                                value={editData.autor || ''}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Ano de Publicação</Form.Label>
                            <Form.Control
                                type="text"
                                name="ano_publicacao"
                                value={editData.ano_publicacao || ''}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Gênero</Form.Label>
                            <Form.Control
                                type="text"
                                name="genero"
                                value={editData.genero || ''}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Sinopse</Form.Label>
                            <Form.Control
                                type="text"
                                name="sinopse"
                                value={editData.sinopse || ''}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>URL da Imagem</Form.Label>
                            <Form.Control
                                type="text"
                                name="imageUrl"
                                value={editData.imageUrl || ''}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit">
                                Salvar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza de que deseja deletar o livro "{bookToDelete?.titulo}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmDeleteBook}>
                        Deletar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </>
    );
}

export default HomePage;
