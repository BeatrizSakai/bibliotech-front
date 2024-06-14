import React, { useEffect, useState } from "react";
import './homePage.css';
import NavHome from "../navbar/navHome";
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

    const [selectedBookId, setSelectedBookId] = useState(null);
    const [showEmprestimoModal, setShowEmprestimoModal] = useState(false);
    const [dataEmprestimo, setDataEmprestimo] = useState('');

    const handleShowEmprestimoModal = (livroId) => {
        setSelectedBookId(livroId);
        setShowEmprestimoModal(true);
    };

    const handleCloseEmprestimoModal = () => {
        setShowEmprestimoModal(false);
        setSelectedBookId(null);
        setDataEmprestimo('');
    };

    const handleReservar = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found. User might not be authenticated.');
            navigate('/login');
            return;
        }
    
        // Verifique se o ID do livro está definido corretamente
        console.log('Selected Book ID:', selectedBookId);
    
        try {
            const response = await axios.post(
                'http://localhost:8080/emprestimos',
                {
                    livroId: selectedBookId,
                    data_emprestimo: dataEmprestimo
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
    
            console.log('Empréstimo criado:', response.data);
            setShowEmprestimoModal(false);
            // Após criar o empréstimo, você pode querer atualizar a lista de livros ou realizar outras ações necessárias
        } catch (error) {
            console.error('Erro ao criar empréstimo:', error);
            if (error.response && error.response.status === 403) {
                console.error('Access denied: You do not have permission to perform this action.');
                // Redirecionar ou exibir mensagem de erro apropriada
            }
        }
    };
    
    const [emprestimos, setEmprestimos] = useState([]);

    useEffect(() => {
        // Função para carregar os empréstimos do usuário
        const carregarEmprestimos = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get("http://localhost:8080/emprestimos", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setEmprestimos(response.data);
            } catch (error) {
                console.error("Erro ao carregar empréstimos:", error);
            }
        };

        carregarEmprestimos();
    }, []);

    const handleDevolucao = async (emprestimoId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/emprestimos/${emprestimoId}/devolucao`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // Atualizar a lista de empréstimos após a devolução
            const updatedEmprestimos = emprestimos.map(emprestimo => {
                if (emprestimo.id === emprestimoId) {
                    return { ...emprestimo, data_devolucao: new Date() };
                }
                return emprestimo;
            });
            setEmprestimos(updatedEmprestimos);
        } catch (error) {
            console.error("Erro ao registrar devolução:", error);
        }
    };

    return (
        <>
            {showEmprestimoModal && (
            <Modal show={showEmprestimoModal} onHide={handleCloseEmprestimoModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Reservar Livro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Data da reserva</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={dataEmprestimo}
                                        onChange={(e) => setDataEmprestimo(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEmprestimoModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary botao" onClick={handleReservar}>
                        Emprestar
                    </Button>
                </Modal.Footer>
            </Modal>
        )}
            <div className="bodyHome">
                <NavHome onSearch={handleSearch} />
                <div className="cadastroLivro">
                    <button className="btn btn-primary cadastro">
                        <a href="/cadastroLivro">Cadastrar Livro</a>
                    </button>
                </div>
                
                <div className="row row-cols-1 row-cols-md-5 cards">
                    {filteredData.map(book => (
                        <div className="col" key={book.id}>
                            <div className="card cardH" >
                                <img onClick={() => handleShow('mostrarLivro', book)}
                                    className="imgLivroHome" 
                                    src={book.imageUrl ? book.imageUrl : imgLivro} 
                                    alt={book.titulo}
                                    onError={(e) => { e.target.onerror = null; e.target.src = imgLivro; }}
                                />
                                <div className="card-body">
                                    <h6 className="card-title">{book.titulo}</h6>
                                    <p className="card-text">{book.autor}</p> 
                                    <button className="btn btn-primary botao" onClick={() => handleShowEmprestimoModal(book.id)}>
                                        Emprestar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

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
                    <Button className="botao" variant="primary" onClick={() => handleShow('editarLivro', modalData)}>
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
                            <Button className="botao" variant="primary" type="submit">
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
        </>
    );
}

export default HomePage;

