import React, {Component} from 'react';
import {Query} from 'react-apollo';

import {PRODUTO_QUERY} from '../../../queries';
import FormularioEditar from '../FormularioEditarProduto';

export default class EditarProdutos extends Component {
  render(){
    const {id} = this.props.match.params;

    return (
      <>
        <h1 className="text-center mb-5">Editar Produto</h1>
        <div className="row justify-content-center">
          <Query query={PRODUTO_QUERY} variables={{id}} >
            {({loading, error, data, refetch}) => {
              if(loading) return "Carregando...";
              if(error) return `Erro ${error.message}`;
              return (
                <FormularioEditar
                  produto={data}
                  id={id}
                  refetch={refetch}
                />
              );

            }}
          </Query>

        </div>

      </>
    );
  }
}
