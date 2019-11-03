import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import {withRouter} from 'react-router-dom';

import {USUARIO_REGISTRO} from '../../../mutations';
import Error from '../../Alertas/Error';


const initialState = {
  usuario: '',
  password: '',
  nome: '',
  rol: '',
  repetirPassword: ''
}
class Registro extends Component {
  state = {
    ...initialState
  }

  atualizarState = e => {
    const {name, value} = e.target;

    this.setState({
      [name]: value
    });
  }
  validarForm = () => {
    const {usuario, password, repetirPassword, nome, rol} = this.state;
    const invalido = !usuario || !password || !nome || !rol ||password !== repetirPassword;

    return invalido;
  }

  limparState = () => {
    this.setState({...initialState});
  }

  criarRegistro = (e, createUsuario) => {
    e.preventDefault();
    createUsuario().then(data => {
      this.limparState();
      this.props.history.push('/login');
    })
  }


  render(){
    const {usuario, password, repetirPassword, nome, rol} = this.state;

    return(
      <>
        <h1 className="text-center mb-5">Novo Usuário</h1>
        <div className="row  justify-content-center">
          <Mutation mutation={USUARIO_REGISTRO} variables={{usuario, password, nome, rol}} >
            {(createUsuario, {loading, error, data}) => {
              return (
                  <form 
                    className="col-md-8"
                    onSubmit={e => this.criarRegistro(e, createUsuario)}

                  >
                    {error && <Error error={error}  />}
                    <div className="form-group">
                        <label>Usuário</label>
                        <input 
                            onChange={this.atualizarState}
                            type="text" 
                            name="usuario" 
                            className="form-control" 
                            placeholder="Usuário..." 
                            value={usuario}
                        />
                        <small className="form-text text-muted">
                          (Sem espaços e sem caracteres especiais)
                        </small>
                    </div>
                    <div className="form-group">
                        <label>Nome</label>
                        <input 
                            onChange={this.atualizarState}
                            type="text" 
                            name="nome" 
                            className="form-control" 
                            placeholder="Nome do usuário..." 
                            value={nome}
                        />
                        <small className="form-text text-muted">
                          (Insira nome completo)
                        </small>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                          <label>Senha</label>
                          <input 
                              onChange={this.atualizarState}
                              type="password" 
                              name="password" 
                              className="form-control" 
                              placeholder="Digite sua senha..."
                              value={password}
                          />
                          
                      </div>
                      <div className="form-group col-md-6">
                          <label>Repetir Senha</label>
                          <input 
                              onChange={this.atualizarState}
                              type="password" 
                              name="repetirPassword" 
                              className="form-control" 
                              placeholder="Repetir sua senha..." 
                              value={repetirPassword}
                          />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Tipo: </label>
                      <select 
                        className="form-control"
                        value={rol}
                        onChange={this.atualizarState}
                        name="rol"
                      >
                        <option value="">Selecione...</option>
                        <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                        <option value="VENDEDOR">VENDEDOR</option>
                      </select>
                    </div>

                    <button 
                        disabled={loading || this.validarForm()}
                        type="submit" 
                        className="btn btn-success float-right">
                            Criar Usuário
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

export default withRouter(Registro);