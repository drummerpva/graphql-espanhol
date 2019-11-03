import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import {withRouter} from 'react-router-dom';

import {ATUALIZAR_PRODUTO} from '../../../mutations';

const initialState = {
  nome: '',
  preco: '',
  estoque: ''
}

class FormularioEditarProduto extends Component {
  state = {...this.props.produto.getProduto};

  limparState = () => {
    this.setState({...initialState});
  }

  atualizarState = e => {
    const {name, value} = e.target;
    this.setState({[name]:value});
  };

  validarForm =()=>{
    const {nome, preco, estoque} = this.state;
    

    const invalido = !nome || !preco || !estoque;
    return invalido;
  }

  editarProdutoForm = (e, atualizarProduto) => {
    e.preventDefault();
    atualizarProduto().then(data => {
      this.setState({...initialState});
    });
  }

  render() {
    const {nome, preco, estoque} = this.state;
    const {id} = this.props;

    const data ={
      id,
      nome,
      preco: Number(preco),
      estoque: Number(estoque)
    }

    return(
      <Mutation mutation={ATUALIZAR_PRODUTO}
        variables={{data}}
        key={id}
        onCompleted={() => this.props.refetch().then(()=>{
          
            this.props.history.push('/produtos');
          })
        }
      >
        {(atualizarProduto, {loading, error, data})=>{
          return(
            
            <form 
              className="col-md-8" 
              onSubmit={ e => this.editarProdutoForm(e, atualizarProduto)}
            >
                <div className="form-group">
                    <label>Nome:</label>
                    <input 
                        onChange={this.atualizarState}
                        type="text"
                        name="nome" 
                        className="form-control" 
                        placeholder="Nome do produto"
                        value={nome}
                    />
                </div>
                <div className="form-group">
                    <label>Preço:</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">$</div>
                        </div>
                        <input 
                            onChange={this.atualizarState}
                            type="number" 
                            name="preco" 
                            className="form-control" 
                            placeholder="Preço"
                            value={preco}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Stock:</label>
                    <input 
                        onChange={this.atualizarState}
                        type="number" 
                        name="estoque" 
                        className="form-control" 
                        placeholder="Estoque do produto"
                        value={estoque} 
                    />
                </div>
                <button 
                    disabled={ this.validarForm() }
                    type="submit" 
                    className="btn btn-success float-right">
                            Salvar Dados
                </button>
            </form>
          );
        }}

      </Mutation>
    );
  }
}


export default withRouter(FormularioEditarProduto);