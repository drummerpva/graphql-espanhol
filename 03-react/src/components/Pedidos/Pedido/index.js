import React from 'react';
import {Query, Mutation} from 'react-apollo';

import {PRODUTO_QUERY} from '../../../queries';
import {ATUALIZA_PEDIDO} from '../../../mutations';

import ResumoProduto from '../ResumoProduto';

import '../NovoPedido/spinner.css';
import './styles.css';

export default props => {
  const {pedido} = props;

  
  const {id} = pedido;
  // console.log(id);

  const dataBR = new Date(Number(pedido.data));

  const {status} = pedido;
  let clase;
  if(status === 'PENDENTE')
    clase = 'border-light';
  else if (status === 'CANCELADO')
    clase = 'border-danger';
  else
    clase = 'border-success';

  return(

    <div className="col-md-4">
        <div className={`card mb-3 ${clase} `} >
            <div className="card-body">
                <p className="card-text font-weight-bold ">Status:
                  <Mutation mutation={ATUALIZA_PEDIDO} >
                    {atualizaPedido  => (
                        <select 
                          className="form-control my-3"
                          value={pedido.status}
                          onChange={e => {
                            const input = {
                              id,
                              pedido:pedido.pedido,
                              data: pedido.data,
                              total: pedido.total,
                              cliente: props.cliente,
                              status: e.target.value
                            };
                            atualizaPedido({variables:{input}});
                          }}
                        >
                                <option value="PENDENTE">PENDENTE</option>
                                <option value="COMPLETADO">COMPLETADO</option>
                                <option value="CANCELADO">CANCELADO</option>
                        </select>
                    )}
                  </Mutation>
                </p> 
                <p className="card-text font-weight-bold">Pedido ID:
                    <span className="font-weight-normal">{pedido.id}</span>
                </p> 
                <p className="card-text font-weight-bold">Data Pedido: 
                    <span className="font-weight-normal"> { dataBR.toLocaleString("pt-BR")}
                    </span>
                </p>

                <h3 className="resaltar-texto card-text text-center mb-3">Produtos do Pedido</h3>
                {pedido.pedido.map((produto, index) => {
                  return(
                    <Query key={produto.id+index} query={PRODUTO_QUERY} variables={{id:produto.id}} >
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
                          <ResumoProduto 
                             produto={data.getProduto}
                             quantidade={produto.quantidade}
                             key={produto.id}
                          />
                        );
                      }}

                    </Query>

                  );
                })}
                <div className="d-flex align-items-center justify-content-end">
                  <p className="card-text resaltar-texto mr-1 bg-amarelo">Total: </p>
                  <p className="font-weight-normal inc-texto "> R$ { pedido.total}</p>
                </div>
            </div>
        </div>
    </div>
  );
}