import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h2>Bem-vindo à nossa aplicação!</h2>
    <p>Por favor, escolha uma opção abaixo:</p>
    <ul>
      <li><Link to="/cadastro">Cadastro</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  </div>
);

export default Home;