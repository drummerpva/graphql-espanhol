import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';

import { Mutation } from 'react-apollo';
import { NOVO_CLIENTE } from '../../../mutations';

class NovoCliente extends Component {
  state = {
    nome: '',
    apelido: '',
    empresa: '',
    idade: '',
    email: '',
    tipo: '',
    error: false,
    emails: []
  }

  novoCampo = () => {
    this.setState({
      emails: this.state.emails.concat([{email: ''}])
    })
  }

  excluirCampo = i => {
    /* const {emails} = this.state;
    emails.splice(i,1);
    this.setState({emails}); */
    this.setState({
      emails: this.state.emails.filter((_, index) => i !== index)
    });
  }

  lerCampo = (i, value) => {
    const novoEmail = this.state.emails.map((email, index) => {
      if(i !== index ) return email;
      return {
        ...email,
        email: value
      }
    });
    this.setState({
      emails: novoEmail
    })
  }

  render(){
    // console.log(this.props.session.getUsuario.id);
    const idVendedor = this.props.session.getUsuario.id;
    const {error} = this.state;
    let resposta = error ? <p className="alert alert-danger p-3 text-center" > Todos os campos são obrigatórios</p>: "";
    return (
      <>
        <div className="text-center">
          <h2>Novo Cliente</h2>
          {resposta}
        </div>
        <Mutation mutation={NOVO_CLIENTE} 
          onCompleted={() => this.props.history.push('/clientes')}
        >

          {criarCliente => (
            <form className="col-md-8 m-3" 
              onSubmit={e => {
                e.preventDefault();
                const {nome, idade, empresa, apelido, tipo, emails} = this.state;
                if(nome === '' || apelido === '' || empresa === '' || idade === '' || tipo === ''){
                  this.setState({
                    error: true
                  });
                  return;
                }

                this.setState({error: false});

                const data = {
                  nome,
                  apelido,
                  empresa,
                  idade: Number(idade),
                  tipo,
                  emails,
                  vendedor: idVendedor
                };
                criarCliente({
                  variables: {data}
                });

              }}
            >
              <div className="form-row">
                  <div className="form-group col-md-6">
                      <label>Nome</label>
                      <input 
                        type="text" 
                        required
                        className="form-control" 
                        placeholder="Nome"
                        onChange={e => this.setState({...this.state, nome: e.target.value})}
                      />
                  </div>
                  <div className="form-group col-md-6">
                      <label>Sobrenome</label>
                      <input 
                        type="text" 
                        required
                        className="form-control" 
                        placeholder="Sobrenome"
                        onChange={e => this.setState({...this.state, apelido: e.target.value})}
                      />
                  </div>
              </div>
              <div className="form-row">
                  <div className="form-group col-md-12">
                      <label>Empresa</label>
                      <input 
                        type="text" 
                        required
                        className="form-control" 
                        placeholder="Empresa"
                        onChange={e => this.setState({...this.state, empresa: e.target.value})}
                      />
                  </div>
                  {this.state.emails.map((email, index) => (
                    <div key={index} className="form-group col-md-12" >
                      <label>E-mail: {index + 1}</label>
                      <div className="input-group">
                        <input
                          required 
                          type="email"
                          onChange={e => this.lerCampo(index, e.target.value)}
                          placeholder={`E-mail ${index+1}`}
                          className="form-control"
                        />
                        <div className="input-group-append">
                          <button 
                            type="button" 
                            className="btn btn-danger"
                            onClick={() => this.excluirCampo(index)}
                          >
                              &times; Excluir
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="form-group d-flex justify-content-center col-md-12">
                    <button
                      onClick={this.novoCampo}
                      type="button"
                      className="btn btn-warning"
                    >

                      + Adicionar E-mail
                    </button>
                  </div>


              </div>
              <div className="form-row">
                  <div className="form-group col-md-6">
                      <label>Idade</label>
                      <input 
                        type="text" 
                        required
                        className="form-control" 
                        placeholder="Idade"
                        onChange={e => this.setState({...this.state, idade: e.target.value})}
                      />
                  </div>
                  <div className="form-group col-md-6">
                      <label>Tipo Cliente</label>  
                      <select className="form-control"
                        onChange={e => this.setState({...this.state, tipo: e.target.value})}
                      >
                          <option value="">Escolher...</option>
                          <option value="PREMIUM">PREMIUM</option>
                          <option value="BASICO">BÁSICO</option>
                      </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-success float-right">Adiconar Cliente</button>
              </form>
            )}
        </Mutation>
      </>
    );
  }
}
export default withRouter(NovoCliente);