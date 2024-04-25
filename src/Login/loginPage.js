import React from "react";
import './loginPage.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LoginPage(){
    return(
        <>
        <div id="bodyLogin">
            <div className="conteiner">
                <div className="forms">
                    <h3 className="titulo">
                        Login
                    </h3>
                    <p>Ainda não possui uma conta? <a className="link" href="/cadastro">Cadastre-se</a></p>
                    <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="E-mail" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Senha" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <div className="botaoLogin">
                       <Button variant="primary" type="submit" className="btn btn-primary login" href="/home">
                        Fazer Login
                    </Button> 
                    </div>
                    
                </Form>
                </div>
                
            </div>
        </div>
        </> 
    );
}
export default LoginPage;