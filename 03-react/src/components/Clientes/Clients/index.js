import React, {Component} from 'react';
import {Query, Mutation} from 'react-apollo';
import {Link} from 'react-router-dom';

import {CLIENTES_QUERY} from '../../../queries';
import {EXCLUIR_CLIENTE} from '../../../mutations';

import Concluido from '../../Alertas/Concluido';
import Paginador from '../../Paginador';


export default class Clients extends Component{
  limite = 7;
  state = {
    alerta:{
      mostrar: false,
      mensagem: ''
    },
    paginador: {
      offset: 0,
      atual: 1
    }
  }

  paginaAnterior = () => {
    this.setState({
      paginador:{
        offset: this.state.paginador.offset - this.limite,
        atual: this.state.paginador.atual - 1
      }
    })
  }
  paginaSeguinte = () => {
    this.setState({
      paginador:{
        offset: this.state.paginador.offset + this.limite,
        atual: this.state.paginador.atual + 1
      }
    })
  }

  render(){

    const {alerta:{mostrar, mensagem}} = this.state;
    const alerta = mostrar ? <Concluido mensagem={mensagem} /> : '';

    let id;
    const {rol} = this.props.session.getUsuario;
    if(rol === "VENDEDOR") id = this.props.session.getUsuario.id;
    else id = '';
    return(
      <Query 
        query={CLIENTES_QUERY} 
        pollInterval={1000} 
        variables={{
            limit: this.limite, 
            offset: this.state.paginador.offset, 
            vendedor:id
          }}
        >
        {({ loading, error, data, startPolling, stopPolling }) => {
          if(loading)return "Carregando...";
          if(error) return `Error: ${error}`;
          return(
            <>
            <h2 className="text-center" >Listando Clientes</h2>
            {alerta}
            <ul className="list-group mt-4 " >
              {data.getClients.map(cli => {
                const {id} = cli;
              return(
                <li key={cli.id} className="list-group-item" >
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-6 d-flex justify-content-between ">
                      {cli.nome} {cli.apelido} - {cli.empresa}
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                      <Link to={`/pedidos/novo/${id}`} className="btn btn-warning d-block d-md-inline-block mr-2" >
                        &#43;Novo Pedido
                      </Link>
                      <Link to={`/pedidos/${id}`} className="btn btn-primary d-block d-md-inline-block mr-2" >
                        Ver Pedidos
                      </Link>
                      <Mutation 
                        mutation={EXCLUIR_CLIENTE}
                        onCompleted={(data) => {
                          console.log(data);
                          this.setState({
                            alerta:{
                              mostrar: true,
                              mensagem: data.deleteClient
                            }
                          }, () => {
                            setTimeout(()=> {
                              this.setState({
                                alerta: {
                                  mostrar: false,
                                  mensagem: ''
                                }
                              })
                            },3000)
                          })
                        }}
                      >
                        {excluirCliente => (
                          <button type="button"  
                            className="btn btn-danger d-block d-md-inline-block mr-2"
                            onClick={() => {
                              if(window.confirm('Deseja realmente excluir o cliente?')){
                                excluirCliente({
                                  variables: {id}
                                });
                              }
                            }}
                          >
                            &times; Excluir
                          </button>
                        )}
                      </Mutation>
                      <Link to={`/cliente/editar/${cli.id}`} className="btn btn-success d-block d-md-inline-block">
                        Editar Cliente
                      </Link>
                    </div>
                  </div>
                </li>)
              })}
            </ul>
            <Paginador 
              atual={this.state.paginador.atual}
              totalClientes={data.totalClients}
              limite={this.limite}
              paginaAnterior={this.paginaAnterior}
              paginaSeguinte={this.paginaSeguinte}
            />
            </>
          );
        }}
      </Query>
    );
  }
}
