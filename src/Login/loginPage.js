import React, { useState } from "react";
import './loginPage.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:8080/login', { email, password });
            localStorage.setItem('token', response.data.token); // Está definindo o token corretamente?
            navigate('/home'); // Redireciona para a página protegida
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Login falhou. Verifique suas credenciais e tente novamente.");
        }
    };
    

    return (
        <div id="bodyLogin">
            <div className="conteiner">
                <div className="forms">
                    <h3 className="titulo">
                        Login
                    </h3>
                    <p>Ainda não possui uma conta? <a className="link" href="/cadastro">Cadastre-se</a></p>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                                type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <div className="botaoLogin">
                            <Button variant="primary" type="submit" className="btn btn-primary login">
                                Fazer Login
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
