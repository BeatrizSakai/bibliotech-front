import './App.css';
import Navbar from './navbar/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './landingPage/landingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './homePage/homePage'; 
import LoginPage from './Login/loginPage';
import CadastroPage from './Cadastro/cadastroPage'
import PerfilPage from './Perfil/perfil';
import React from 'react';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <LandingPage></LandingPage> */}
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/cadastro" element={<CadastroPage/>} />
          <Route path="/perfil" element={<PerfilPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
