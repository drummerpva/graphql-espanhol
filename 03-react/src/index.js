import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider} from 'react-apollo';

import './styles.css';
import {RootSession} from './App';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  //Enviar token ao servidor
  fetchOptions: {
    credentials: 'include'
  },
  request: op => {
    const token = localStorage.getItem('token');
    op.setContext({
      headers:{
        authorization: token
      }
    });
  },
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({networkError, graphQLErros})=>{
    console.log(`graphQLErros: ${graphQLErros}`);
    console.log(`networkError: ${networkError}`);
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootSession />
  </ApolloProvider>

, document.getElementById('root'));

