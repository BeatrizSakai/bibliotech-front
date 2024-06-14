import React, { useState } from "react";
import './cadastroLivroPage.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CadastroLivroPage() {
    const [data, setData] = useState({
        titulo: '',
        autor: '',
        ano_publicacao: '',
        genero: '',
        sinopse: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate();

    const valueInput = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const addBook = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/s3Url");
            console.log('Raw response:', response);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const json = await response.json();
            console.log('JSON response:', json);

            const { url } = json;

            await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": imageFile.type // Corrigido o Content-Type
                },
                body: imageFile
            });

            const bookData = { ...data, imageUrl: url.split('?')[0] };
            const responseBook = await axios.post('http://localhost:8080/books', bookData);
            console.log(responseBook.data.mensagem);

            // Redirecionar para a página Home após o cadastro
            navigate('/home');
        } catch (error) {
            console.error('Error fetching S3 URL or uploading image:', error);
        }
    };

    return (
        <div id="bodyCadastro">
            <div className="conteiner">
                <div className="forms">
                    <h3>Cadastro de Livro</h3>
                    <p>Preencha as informações do livro</p>
                    <Form id="imageForm" onSubmit={addBook}>
                        <input id="imageInput" type="file" accept="image/*" onChange={handleImageChange} />
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Control type="text" name="titulo" placeholder="Titulo" onChange={valueInput} value={data.titulo} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" name="autor" placeholder="Autor" onChange={valueInput} value={data.autor} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Control type="number" name="ano_publicacao" placeholder="Ano de Publicação" onChange={valueInput} value={data.ano_publicacao} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Control type="text" name="genero" placeholder="Genero" onChange={valueInput} value={data.genero} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Control type="text" name="sinopse" placeholder="Sinopse" onChange={valueInput} value={data.sinopse} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="btn btn-primary login">
                            Cadastrar
                        </Button>
                        <Button variant="primary" className="btn btn-primary login">
                            <a href="/home">Voltar</a>
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}
