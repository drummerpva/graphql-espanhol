import React from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Header from './components/Header';
import Clientes from './components/Clientes/Clients';
import EditarCliente from './components/Clientes/EditarCliente';
import NovoCliente from './components/Clientes/NovoCliente';

import NovoProduto from './components/Produtos/NovoProduto';
import Produtos from './components/Produtos/Produtos';
import EditarProduto from './components/Produtos/EditarProdutos';

import NovoPedido from './components/Pedidos/NovoPedido';
import PedidosCliente from './components/Pedidos/PedidosCliente';
import Painel from './components/Painel';
import Registro from './components/Auth/Registro';
import Login from './components/Auth/Login';

import Session from './components/Session';



const App = ({refetch, session}) => {
  const {getUsuario} = session;
  const mensagem = (getUsuario) ? `Bem vindo, ${getUsuario.nome}` : <Redirect to="/login" />;
  const logado = session.getUsuario ? true : false; 
  return(
      <Router>
        <Header session={session} />
        
        <div className="container">
          <p className="text-right" >{mensagem}</p>
          <Switch>
            <Route path="/clientes" exact render={() => logado ? <Clientes session={session} /> : <Redirect to="/login" />} />
            <Route path="/cliente/editar/:id" exact component={EditarCliente} />
            <Route path="/cliente/novo" exact render={() => logado ? <NovoCliente session={session} /> : <Redirect to="/login" />} />
            <Route path="/produtos" exact component={Produtos} />
            <Route path="/produto/editar/:id" exact component={EditarProduto} />
            <Route path="/produto/novo" exact component={NovoProduto} />
            <Route path="/pedidos/:id" exact component={PedidosCliente} />
            <Route 
                path="/pedidos/novo/:id" 
                exact 
                render={() => logado ? <NovoPedido session={session} /> : <Redirect to="/login" /> }
            />
            <Route path="/painel" exact component={Painel} />
            <Route path="/registro" exact render={() => logado && session.getUsuario.rol === "ADMINISTRADOR" ? <Registro /> : <Redirect to="/painel" /> } />
            <Route path="/login" exact render={() => <Login refetch={refetch}/> } />
          </Switch>
        </div>
      </Router>
  );
}

const RootSession = Session(App);

export {RootSession};
