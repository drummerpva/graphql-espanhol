import React from 'react';
import { Query, Mutation } from 'react-apollo';
import {Link} from 'react-router-dom';
import { PRODUTOS_QUERY } from '../../../queries';
import { EXCLUIR_PRODUTO } from  '../../../mutations';

import Concluido from '../../Alertas/Concluido';
import Paginador from '../../Paginador'; 


export default class Produtos extends React.Component {
  limite = 10;
  state ={
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
    return (
      <>
        <h1 className="text-center mb-5">Produtos</h1>
        {alerta}
        <Query query={PRODUTOS_QUERY} 
          pollInterval={1000} 
          variables={{limit: this.limite, offset: this.state.paginador.offset}} 
        >
          {({ loading, error, data, startPolling, stopPolling }) => {
            if(loading)return "Carregando...";
            if(error) return `Error: ${error}`;
            return(
              <>
                <table className="table">
                  <thead>
                    <tr className="table-primary">
                      <th scope="col" >Nome</th>
                      <th scope="col" >Preço</th>
                      <th scope="col" >Estoque</th>
                      <th scope="col" >Excluir</th>
                      <th scope="col" >Editar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.getProdutos.map(item => {
                      const {id} = item;

                      const {estoque} = item;
                      let clase;
                      if(estoque < 50) clase = 'table-danger text-light';
                      else if(estoque < 100) clase = 'table-warning'
                      else clase = '';
                      return(
                        <tr key={id}  className={clase} >
                          <td>{item.nome}</td>
                          <td>{item.preco}</td>
                          <td>{item.estoque}</td>
                          <td>
                            <Mutation mutation={EXCLUIR_PRODUTO} 
                              onCompleted={(data) => {
                                this.setState({
                                  alerta:{
                                    mostrar: true,
                                    mensagem: data.excluirProduto
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
                              {excluirProduto => (
                                <button type="button" className="btn btn-danger"
                                  onClick={() => {
                                    if(window.confirm("Deseja realmente excluir este produto?"))
                                      excluirProduto({
                                        variables:{id}
                                      });
                                  }}
                                >
                                  &times; Excluir
                                </button>

                              )}
                            </Mutation>
                          </td>
                          <td>
                            <Link to={`/produto/editar/${id}`} className="btn btn-success" >
                              Editar Produto
                            </Link>
                          </td>
                        </tr>

                      )
                    }
                  )}
                  </tbody>
                </table>
                <Paginador 
                  atual={this.state.paginador.atual}
                  totalClientes={parseInt(data.totalProdutos)}
                  limite={this.limite}
                  paginaAnterior={this.paginaAnterior}
                  paginaSeguinte={this.paginaSeguinte}
                />
              </>
            );
          }
        }
        </Query>
      </>
    );

  }
}
