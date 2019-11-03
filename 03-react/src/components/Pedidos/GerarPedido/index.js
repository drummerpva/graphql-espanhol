import React from 'react';
import {Mutation} from 'react-apollo';
import { withRouter } from 'react-router-dom';

import {PEDIDO_NOVO} from '../../../mutations';



const validarPedido = props => {
  let invalido = !props.produtos || props.total <= 0;

  return invalido;
}


function GerarPedido(props) {
  return (
    <Mutation mutation={PEDIDO_NOVO}  
      onCompleted={() => props.history.push('/clientes')}
    >
      {novoPedido => (
        <button
          disabled={validarPedido(props)}
          type="button"
          className="btn btn-warning mt-4"
          onClick={e => {
            const produtosInput = props.produtos.map(({nome, preco, estoque, ...objeto}) => objeto);
            const data = {
              pedido: produtosInput,
              total: props.total,
              cliente: props.idCliente,
              vendedor: props.vendedor
            };

            novoPedido({
              variables: {data}
            });

          }}
        >
          Gerar Pedido
        </button>
      )}
    </Mutation>
  );
}

export default withRouter(GerarPedido);