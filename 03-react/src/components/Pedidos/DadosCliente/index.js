import React from 'react';
import {Query} from 'react-apollo';

import {CLIENTE_QUERY}  from '../../../queries';


export default function DadosCliente({id}) {
  return (
    <>
      <h2 className="text-center mb-3" >Resumo do Cliente</h2>
      <Query query={CLIENTE_QUERY} variables={{id}} pollInterval={500} >
        {({loading, error, data, startPolling, stopPolling}) => {
          if(loading) return "Carregando...";
          if(error) return `Erro: ${error.message}`;
          // console.log(data.getClient);
          const {nome, apelido, empresa, idade, emails, tipo} = data.getClient;
          return(
            <ul className="list-unstyled my-5" >
              <li className="border font-weight-bold p-2" >Nome: 
                <span className="font-weight-normal">{ nome}</span>
              </li>
              <li className="border font-weight-bold p-2" >Sobrenome: 
                <span className="font-weight-normal">{ apelido}</span>
              </li>
              <li className="border font-weight-bold p-2" >Idade: 
                <span className="font-weight-normal">{ idade}</span>
              </li>
              <li className="border font-weight-bold p-2" >E-mails: 
                <span className="font-weight-normal">{ emails.map(email => ` ${email.email}` )}</span>
              </li>
              <li className="border font-weight-bold p-2" >Empresa: 
                <span className="font-weight-normal">{ empresa}</span>
              </li>
              <li className="border font-weight-bold p-2" >Tipo: 
                <span className="font-weight-normal">{ tipo}</span>
              </li>
            </ul>
          );
        }}

      </Query>
    </>
  );
} 
