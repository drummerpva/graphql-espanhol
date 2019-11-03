import React from 'react';
import {Query} from 'react-apollo';

import { PEDIDOS_QUERY } from '../../../queries';

import Pedido from '../Pedido';

import '../NovoPedido/spinner.css';

export default props => {
  const cliente = props.match.params.id;

  return(
    <>
      <h1 className="text-center mb-5">Pedidos do Cliente</h1>
      <div className="row">
        <Query query={PEDIDOS_QUERY} variables={{cliente}} pollInterval={500} >
          {({loading, error, data, startPolling, stopPolling})=>{
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
              data.getPedidos.map(pedido => (
                <Pedido 
                  key={pedido.id}
                  pedido={pedido}
                  cliente={cliente}
                />
              ))

            );
          }}
        </Query>
      </div>
    </>
  );
}