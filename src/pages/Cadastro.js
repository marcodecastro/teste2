

import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';


function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState(null);
  const [cadastroSucesso, setCadastroSucesso] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Verifique se as senhas correspondem
    if (senha !== confirmarSenha) {
      setError('As senhas não correspondem!');
      setIsLoading(false);
      return;
    }

    try {
      // Enviar os dados ao backend
      const response = await fetch('https://teste1-xepg.onrender.com/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome,
          email: email,
          senha: senha,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Erro desconhecido');
      }

      // Limpa qualquer erro anterior em caso de sucesso
      setError(null);

      // Atualiza o estado apenas se a resposta for bem-sucedida
      setCadastroSucesso(true);

      // Limpa os campos do formulário
      setNome('');
      setEmail('');
      setSenha('');
      setConfirmarSenha('');
    } catch (error) {
      setError(`Erro no cliente: ${error.message}`);
      console.error('Erro no cliente:', error);

      if (error.response) {
        // O servidor respondeu com um status de erro. Exiba a mensagem do servidor.
        setError(`Erro no servidor: ${error.response.message}`);
      } else {
        // Erro desconhecido
        setError(`Erro desconhecido: ${error.message}`);
      }
    
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Cadastro</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {cadastroSucesso && <p style={{ color: 'green' }}>Usuário cadastrado com sucesso.</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Senha:
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </label>
        <label>
          Confirmar Senha:
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
        </label>
        <input type="submit" value={isLoading ? 'Cadastrando...' : 'Cadastrar'} disabled={isLoading} />
      </form>
      <Link to="/login">Já tem uma conta? Faça login</Link>
    </div>
  );
}

export default Cadastro;