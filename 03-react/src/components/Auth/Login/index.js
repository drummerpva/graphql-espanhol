import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import Error from '../../Alertas/Error';
import {AUTENTICAR_USUARIO} from '../../../mutations';

const initialState = {
    usuario : '',
    password: ''
}

class Login extends Component {
    state = {
        ...initialState
    }

     atualizarState = e => {
         const { name, value} = e.target;

        this.setState({
            [name] : value
        })
     }


    limparState = () => {
         this.setState({...initialState});
    }

    iniciarSesion = async (e, usuarioAutenticar) => {
        e.preventDefault();
        const {data} = await usuarioAutenticar();
        localStorage.setItem('token', data.autenticarUsuario.token);
        await this.props.refetch();
        
        this.limparState();

        this.props.history.push('/painel');
     }

     validarForm = () => {
        const {usuario, password} = this.state;

        const invalido = !usuario || !password;

        return invalido;
     }
    render() { 

        const {usuario, password} = this.state;
      
        return ( 
            <>
                 <h1 className="text-center mb-5">Entrar no Sistema</h1>
                <div className="row  justify-content-center">

                    <Mutation 
                        mutation={AUTENTICAR_USUARIO}
                        variables={{usuario, password}}    
                    >
                    {( usuarioAutenticar, {loading, error, data}) => {

                        return (
                            
                            <form 
                                onSubmit={ e => this.iniciarSesion(e, usuarioAutenticar) } 
                                className="col-md-8"
                            >

                            {error && <Error error={error} />}
                            

                            <div className="form-group">
                                <label>Usuário</label>
                                <input 
                                    onChange={this.atualizarState} 
                                    value={usuario}
                                    type="text" 
                                    name="usuario" 
                                    className="form-control" 
                                    placeholder="Usuário" 
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input 
                                    onChange={this.atualizarState} 
                                    value={password}
                                    type="password" 
                                    name="password" 
                                    className="form-control" 
                                    placeholder="Password"
                                />
                            </div>

                            <button 
                                disabled={ 
                                    loading || this.validarForm()
                                }
                                type="submit" 
                                className="btn btn-success float-right">
                                    Login
                            </button>
                            
                        </form>
                        )     
                    }}
                    </Mutation>
                </div>
            </>
        );
    }
}
 
export default withRouter(Login);