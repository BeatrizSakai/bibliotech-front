import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './landingPage/landingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './homePage/homePage'; 
import LoginPage from './Login/loginPage';
import CadastroPage from './Cadastro/cadastroPage';
import PerfilPage from './Perfil/perfilPage';
import React from 'react';
import CadastroLivroPage from './CadastroLivro/cadastroLivroPage';
import PrivateRoute from './Private/privateRoute'; // Importe o componente PrivateRoute
import MeusEmprestimosPage from './Emprestimos/meusEmprestimosPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path="/perfil" element={<PrivateRoute element={PerfilPage} />} />
          <Route path="/cadastroLivro" element={<PrivateRoute element={CadastroLivroPage} />} />
          <Route path="/home" element={<PrivateRoute element={HomePage} />} />
          <Route path="/meusEmprestimos" element={<PrivateRoute element={MeusEmprestimosPage} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
