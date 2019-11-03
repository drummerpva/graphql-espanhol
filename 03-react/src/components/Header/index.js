import React from 'react';
import {Link} from 'react-router-dom';

import EncerrarSession from '../EncerrarSession';
import ButtonRegistro from '../ButtonRegistro';

export default ({session}) => {
    let barra = (session.getUsuario) ? <NavegacaoAutenticada session={session} /> : <NavegacaoNaoAutenticada />;
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
            <div className="container">
                {barra}
            </div>
        </nav>
    );
}

const NavegacaoNaoAutenticada = () => (
    <Link to="/" className="navbar-brand text-light font-weight-bold" >
        CRM
    </Link>
);
const NavegacaoAutenticada = ({session}) => (
    <>
        <Link to="/painel" className="navbar-brand text-light font-weight-bold" >
            CRM
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navegacion" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navegacion">
            <ul className="navbar-nav ml-auto text-right">
                <li className="nav-item dropdown mr-md-2 mb-2 mr-md-8">
                    <button
                        className="nav-link dropdown-toggle btn btn-block btn-success"
                        data-toggle="dropdown"
                    >Clientes</button>
                    <div className="dropdown-menu" aria-labelledby="navegaction" >
                    <Link to="/clientes" className="dropdown-item" >
                        Ver Clientes
                    </Link>
                    <Link to="/cliente/novo" className="dropdown-item" >
                        Novo Cliente
                    </Link>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <button
                        className="nav-link dropdown-toggle btn btn-block btn-success"
                        data-toggle="dropdown"
                    >Produtos</button>
                    <div className="dropdown-menu" aria-labelledby="navegaction" >
                    <Link to="/produtos" className="dropdown-item" >
                        Ver Produtos
                    </Link>
                    <Link to="/produto/novo" className="dropdown-item" >
                        Novo Produto
                    </Link>
                    </div>
                </li>
                {session.getUsuario.rol === "ADMINISTRADOR" && <ButtonRegistro /> }
                <EncerrarSession />
            </ul>
        </div>
    </>
);
