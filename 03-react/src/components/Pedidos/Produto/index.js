import React, { Component } from 'react';


export default class Produto extends Component {
  render() {
    const {produto, excluirProduto} = this.props;

    return (
      <>
        <tr>
          <td>{produto.nome}</td>
          <td>{produto.preco}</td>
          <td>{produto.estoque}</td>
          <td>
            <input 
              type="number"
              className="form-control"
              min="1"
              max={produto.estoque}
              onChange={e => {
                if(e.target.value > produto.estoque){
                  e.target.value = 1;
                }
                this.props.atualizarQuantidade(e.target.value, this.props.index)
              }}
            />
          </td>
          <td>
            <button type="button" 
              className="btn btn-danger"
              onClick={() => excluirProduto(produto.id)}
            >
              &times; Excluir
            </button>
          </td>
        </tr>
      </>
    );
  }
}
