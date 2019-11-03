import React from 'react';

import Produto from '../Produto';

export default function Resumo(props) {
  const produtos = props.produtos;

  if(produtos && produtos.length === 0) return null;
  return (
    <>
      <h2 className="text-center my-5" >Resumo e quantidade</h2>

      <table className="table">
        <thead className="bg-success text-light">
          <tr className="font-weight bold">
            <th>Produto</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Quantidade</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto,index) => (
            <Produto 
              key={produto.id}
              id={produto.id}
              produto={produto}
              index={index}
              atualizarQuantidade={props.atualizarQuantidade}
              excluirProduto={props.excluirProduto}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
