import React from 'react'
import { Link } from 'react-router-dom'

const Inicial = () => {
  return (
    <div>
      <div>Esta é Minha Página Inicial</div>
    
      <Link to="/Cadastro">Cadastro</Link>
      <Link to="/Login">Login</Link>
    </div>
  )
}

export default Inicial