import React from 'react';


export default ({quantidade, produto}) => {
  return(
    <>
      <div className="produtos-container mb-4 p-4">
        <p className="card-text font-weight-bold">
          Nome do Produto:
          <span className="font-weight-normal">{produto.nome}</span>
        </p>
        <p className="card-text font-weight-bold">
          Quantidade:
          <span className="font-weight-normal">{quantidade}</span>
        </p>
        <p className="card-text font-weight-bold">
          Preço:
          <span className="font-weight-normal"> R$ {produto.preco}</span>
        </p>
      </div>
    </>
  );
};
