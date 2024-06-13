import './perfil.css';
import Navbar from "../navbar/navHome";
import imgPerfil from '../imagens/imgPerfil.jpg';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const PerfilPage = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ id: '', name: '', email: '', password: '' });
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const userData = response.data.user;
                setUser(userData);
                setFormData({
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    password: '',
                });
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
                navigate('/login');
            }
        };

        fetchUser();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = (e) => {
        e.preventDefault();
        console.log("Edit button clicked");
        setEditMode(true);
    };

    const handleCancel = (e) => {
        e.preventDefault();
        console.log("Cancel button clicked");
        setEditMode(false);
        setFormData({
            id: user.id,
            name: user.name,
            email: user.email,
            password: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submit button clicked");
        const token = localStorage.getItem('token');
        try {
            await axios.put('http://localhost:8080/users', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEditMode(false);
            setUser({ ...user, ...formData, password: undefined });
        } catch (error) {
            console.error('Erro ao atualizar dados do usuário:', error);
        }
    };

    const handleDelete = async () => {
        console.log("Delete confirmed");
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8080/users/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error('Erro ao excluir a conta do usuário:', error);
        }
    };

    const handleShowConfirmModal = () => {
        setShowConfirmModal(true);
    };

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
    };

    if (!user) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <div className='nav'>
                <Navbar />  
            </div>
            <h2 className='titulo'>Perfil do Usuário</h2>
            <div className="profile-page">
                <img className="imgPerfil" src={imgPerfil} alt="imgPerfil" /> {/* Adiciona a imagem do perfil */}
                <div className="conteudoo">
                    <h4>Dados pessoais</h4>
                    <form>
                        <div>
                            <label className="form-label">Nome:</label>
                            <input className="form-control"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={!editMode}
                            />
                        </div>
                        <div>
                            <label className="form-label">Email:</label>
                            <input className="form-control"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={!editMode}
                            />
                        </div>
                        {editMode && (
                            <div>
                                <label className="form-label">Senha:</label>
                                <input className="form-control"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        )}
                        <div>
                            {editMode ? (
                                <>
                                    <button className="btn btn-primary" type="button" onClick={handleSubmit}>Salvar</button>
                                    <button className="btn btn-danger" type="button" onClick={handleCancel}>Cancelar</button>
                                </>
                            ) : (
                                <button className="btn btn-primary" type="button" onClick={handleEdit}>Editar</button>
                            )}
                        </div>
                        <div className='excluirPerfil'>
                            <button className="btn btn-danger" type="button" onClick={handleShowConfirmModal}>
                                Excluir perfil
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>Você tem certeza de que deseja excluir seu perfil?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PerfilPage;
