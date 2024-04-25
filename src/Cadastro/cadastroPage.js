import React, { useState } from "react";
import './cadastroPage.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function CadastroPage(){

    const[data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const valueInput = (e) => setData({...data, [e.target.name]: e.target.value});

    const addUser = async (e) => {
        console.log("enviar")
        console.log(data.name)
        console.log(data.email)

        const headers= {
            'headers': {
                'Content-Type': 'application/json'
            }
        };
        await axios.post('http://localhost:8080/users', data, headers)
            .then((response) => {
                console.log(response.data.mensagem);
            }).catch((err) => {
                console.log(err.response.data)
            });

    }

    return(
        <>
        <div id="bodyCadastro">
            <div className="conteiner">
                <div className="forms">
                    <h3 className="titulo">
                        Cadastre-se
                    </h3>
                    <p>Ja possui uma conta? <a className="link" href="/login">Faça o login</a></p>
                    <Form onSubmit={addUser}>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Control type="text" name="name" placeholder="Nome" onChange={valueInput} value={data.name}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" name="email" placeholder="E-mail" onChange={valueInput} value={data.email}/>
                        </Form.Group>
                         <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" name="password" placeholder="Senha"  onChange={valueInput} value={data.senha} />
                        </Form.Group> 
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Confirme a Senha" />
                        </Form.Group> 
                        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Ao criar uma conta, você concorda com nossos
    Termos de uso e politica de privacidade" />
                        </Form.Group> */}
                            <Button variant="primary" type="submit" className="btn btn-primary login">
                            Cadastrar
                            </Button> 
                        
                </Form>
                </div>
                
            </div>
        </div>
        </> 
    );
}