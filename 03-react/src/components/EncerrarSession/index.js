import React from 'react';
import {ApolloConsumer} from 'react-apollo';
import {withRouter} from 'react-router-dom';

const encerrarSessaoUsuario = (cliente, history) => {
  localStorage.removeItem('token');
  cliente.resetStore();
  history.push("/login");
}

const EncerrarSession = ({history}) => (
  <ApolloConsumer>
    {cliente => {
      return(
        <button className="btn btn-light  ml-md-2 mt-2 mt-md-0"
          onClick={() => encerrarSessaoUsuario(cliente, history)}
        >
          Encerrar Sessão
        </button>
      );
    }}
  </ApolloConsumer>
)

export default withRouter(EncerrarSession);
