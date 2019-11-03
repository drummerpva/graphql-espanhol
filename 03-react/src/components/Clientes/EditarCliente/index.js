import React, {Component} from 'react';
import { Query } from 'react-apollo';
import { CLIENTE_QUERY } from '../../../queries';



import FormularioEditarCliente from '../FormularioEditarCliente';

export default class EditarCliente extends Component {
  state= {

  };
  render(){
    const {id} = this.props.match.params;
    console.log(id);
    return (
      <>
        <h2 className="text-center" >Editar Cliente</h2>
        <div className="row justify-content-center">
          <Query query={CLIENTE_QUERY} variables={{id}} >
            {({loading, error, data, refetch})=> {
                if(loading)  return "Carregando...";
                if(error) return `Error! ${error.message}`;
                return (
                  <FormularioEditarCliente
                    cliente={data.getClient}
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
