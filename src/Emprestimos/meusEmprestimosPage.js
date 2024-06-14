import React, { useEffect, useState } from "react";
import './meusEmprestimos.css';
import NavHome from "../navbar/navHome";
import axios from "axios";


function MeusEmprestimosPage() {
    



    
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
            <div>
            <NavHome/>
            <div className="textoo">
                <h2 >Meus Empréstimos</h2>
                <ul>
                    {emprestimos.map(emprestimo => (
                    <li key={emprestimo.id}>
                        {emprestimo.livro.titulo} - Data de Empréstimo: {new Date(emprestimo.data_emprestimo).toLocaleDateString()}
                        {emprestimo.data_devolucao ? (
                        <span> - Devolvido em: {new Date(emprestimo.data_devolucao).toLocaleDateString()}</span>) : (
                            <button className="botao" onClick={() => handleDevolucao(emprestimo.id)}>Registrar Devolução</button>
                        )}
                    </li>
                    ))}
                </ul>
            </div>
        </div>
        </>
    );
}

export default MeusEmprestimosPage;

