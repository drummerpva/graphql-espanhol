import React, { Component } from 'react';
import Select from 'react-select';
import Animated from 'react-select/animated';

import Resumo from '../Resumo';
import GerarPedido from '../GerarPedido';

import Error from '../../Alertas/Error'

export default class ProdutosPedido extends Component {
  state = {
    produtos: [],
    total: 0
  }

  selecionarProduto = produtos => {
    this.setState({
      produtos
    }, () => {
      this.atualizarTotal();
    });
    
  }

  atualizarTotal = () => {
    const produtos = this.state.produtos || [];
    if(produtos.length === 0){
      this.setState({total:0});
      return;
    }
    let novoTotal = 0;
    
    
    
    produtos.map(prod => novoTotal += (prod.quantidade * prod.preco));
    this.setState({
      total: novoTotal
    })
  };

  atualizarQuantidade = (quantidade, index) => {
    const produtos = this.state.produtos || [];
    produtos[index].quantidade = Number(quantidade);
    this.setState({produtos}, () => {
      this.atualizarTotal()
    });
  }
  excluirProduto = id => {
    
    const produtos = this.state.produtos;
    const produtosRestantes = produtos.filter(prod => prod.id !== id);

    this.setState({produtos: produtosRestantes}, () => {
      this.atualizarTotal()
    });
  }


  render() {
    const mensagem = (this.state.total < 0) ? <Error error="As quantidade não podem ser negativas" /> : "";
    return (
      <>
        <h2 className="text-center mb-5">Selecionar Produtos</h2>
        {mensagem}
        <Select 
          onChange={this.selecionarProduto}
          options={this.props.produtos} 
          isMulti={true}
          components={Animated()}
          placeholder={'Selecionar produtos'}
          getOptionValue={(options) => options.id}
          getOptionLabel={(options) => options.nome}
          value={this.state.produtos}
        />
          <Resumo 
            produtos={this.state.produtos || []}
            atualizarQuantidade={this.atualizarQuantidade}
            excluirProduto={this.excluirProduto}
          />
          <p className="font-weight-bold float-right">
            Total:
            <span className="font-weight-normal">
              R$ {this.state.total}
            </span>
          </p>
          <GerarPedido 
            produtos={this.state.produtos || []}
            total={this.state.total || 0}
            idCliente={this.props.id}
            vendedor={this.props.vendedor}
          />
      </>
    );
  }
}
