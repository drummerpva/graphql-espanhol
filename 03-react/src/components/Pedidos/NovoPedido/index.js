import React, { Component } from 'react';
import {Query} from 'react-apollo';
import {withRouter} from 'react-router-dom';

import DadosCliente from '../DadosCliente';
import { PRODUTOS_QUERY } from '../../../queries';

import ProdutosPedido from '../ProdutosPedido';

import './spinner.css';

class NovoPedido extends Component {
  state = {};

  render() {
    const {id} = this.props.match.params;

    return (
    <>
      <h1 className="text-center mb-5" >Novo Pedido</h1>
      <div className="row">
        <div className="col-md-3">
          <DadosCliente
            id={id}
          /> 
        </div>
        <div className="col-md-9">
          <Query query={PRODUTOS_QUERY} variables={{estoque: true}} pollInterval={500} >
            {({loading, error, data}) => {
              if(loading) return (
                <div className="spinner">
                  <div className="rect1"></div>
                  <div className="rect2"></div>
                  <div className="rect3"></div>
                  <div className="rect4"></div>
                  <div className="rect5"></div>
                </div>
              );
              if(error) return `Erro: ${error.message}`;
              return(
                <ProdutosPedido 
                  produtos={data.getProdutos}
                  id={id}
                  vendedor={this.props.session.getUsuario.id}
                />
              );
            }}
          </Query>
        </div>
      </div>
    </>);
  }
}
export default withRouter(NovoPedido);