import React from 'react';
import {Mutation} from 'react-apollo';

import {NOVO_PRODUTO} from '../../../mutations';

const initialState = {
  nome: '',
  preco: '',
  estoque: ''
}

export default class NovoProduto extends React.Component {
  state = {...initialState};

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

  criarNovoProduto = (e, novo) => {
    e.preventDefault();
    
    novo().then(data => {
      this.limparState();

      this.props.history.push('/produtos');

    })

  };

  render(){
    const {nome, preco, estoque} = this.state;

    const data ={
      nome,
      preco: Number(preco),
      estoque: Number(estoque)
    }

    return (
      <>
        <h1 className="text-center mb-5">Novo Produto</h1>
        <div className="row justify-content-center">
          <Mutation mutation={NOVO_PRODUTO} variables={{data}} >
          {(novoProduto,{loding, error, data}) => {
            return(
              <form 
              className="col-md-8"
              onSubmit={e => this.criarNovoProduto(e, novoProduto)}
              >
              <div className="form-group">
                  <label>Nome:</label>
                  <input 
                      type="text"
                      name="nome" 
                      className="form-control" 
                      placeholder="Nome do produto"
                      onChange={this.atualizarState}
                  />
              </div>
              <div className="form-group">
                  <label>Preço:</label>
                  <div className="input-group">
                      <div className="input-group-prepend">
                          <div className="input-group-text">$</div>
                      </div>
                      <input 
                          type="number" 
                          name="preco" 
                          className="form-control" 
                          placeholder="Preço do produto"
                          onChange={this.atualizarState}
                      />
                  </div>
              </div>
              <div className="form-group">
                  <label>Estoque:</label>
                  <input 
                      type="number" 
                      name="estoque" 
                      className="form-control" 
                      placeholder="Estoque do produto" 
                      onChange={this.atualizarState}
                  />
              </div>
              <button 
                  disabled={this.validarForm()}
                  type="submit" 
                  className="btn btn-success float-right">
                      Criar Produto
              </button>
            </form>
            );
          }}
          </Mutation>
        </div>
      </>
    );
  }
}
