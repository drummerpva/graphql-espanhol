import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {Mutation } from 'react-apollo';
import {ATUALIZAR_CLIENTE} from '../../../mutations';

class FormularioEditar extends Component {

    state =  {
        cliente: this.props.cliente,
        emails: this.props.cliente.emails
    }

    nuevoCampo = () => {
        this.setState({
            emails: this.state.emails.concat([{email:''}])
        })
    }

    leerCampo = i => e => {
        const nuevoMail = this.state.emails.map((email, index) => {
                if (i !== index) return email;
                return { ...email, email: e.target.value };
        });
        this.setState({ emails: nuevoMail });
    }

    quitarCampo = i => () => {
        this.setState({
            emails: this.state.emails.filter((s, index) => i !== index)
        });
    }



    render() { 
            const {nome, apelido, empresa, idade, tipo} = this.state.cliente;

            const {emails} = this.state;
           
            return (
                <Mutation mutation={ATUALIZAR_CLIENTE} 
                    onCompleted={() => this.props.refetch()
                        .then(() => this.props.history.push('/clientes'))}
                >

                {atualizarCliente => (
                   <form className="col-md-8 m-3" onSubmit={e => {
                       e.preventDefault();

                       const {id, nome, apelido, empresa, idade, tipo} = this.state.cliente;
                       const {emails} = this.state;
                       const data ={
                           id,
                           nome,
                           apelido,
                           empresa,
                           idade: Number(idade),
                           tipo,
                           emails
                       };
                    //    console.log(data);
                    atualizarCliente({
                        variables: {data}
                    });

                   }} >
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Nome</label>
                                    <input
                                        type="text" 
                                        className="form-control"
                                        defaultValue={nome}
                                        onChange={e => {
                                            this.setState({
                                                cliente:{
                                                    ...this.state.cliente,
                                                    nome: e.target.value
                                                }
                                            })
                                        }} 
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Sobrenome</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        defaultValue={apelido}
                                        onChange={e => {
                                            this.setState({
                                                cliente:{
                                                    ...this.state.cliente,
                                                    apelido: e.target.value
                                                }
                                            })
                                        }} 
                                     />
                                </div>
                            </div>
                          
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label>Empresa</label>
                                    <input
                                        type="text" 
                                        className="form-control"
                                        defaultValue={empresa}
                                        onChange={e => {
                                            this.setState({
                                                cliente:{
                                                    ...this.state.cliente,
                                                    empresa: e.target.value
                                                }
                                            })
                                        }}  
                                    />
                                </div>

                                {emails.map((input, index) => (
                                    <div key={index} className="form-group col-md-12">
                                        <label>Email {index + 1} : </label>
                                        <div className="input-group">
                                        
                                            <input 
                                                type="email"
                                                placeholder={`Email`}
                                                className="form-control" 
                                                onChange={this.leerCampo(index)}
                                                defaultValue={input.email}
                                            />
                                            <div className="input-group-append">
                                                <button 
                                                    className="btn btn-danger" 
                                                    type="button" 
                                                    onClick={this.quitarCampo(index)}> 
                                                    &times; Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="form-group d-flex justify-content-center col-md-12">
                                    <button 
                                        onClick={this.nuevoCampo}
                                        type="button" 
                                        className="btn btn-warning"
                                    >+ Adicionar Email</button>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Edad</label>
                                    <input
                                        type="text" 
                                        className="form-control"
                                        defaultValue={idade}
                                        onChange={e => {
                                            this.setState({
                                                cliente:{
                                                    ...this.state.cliente,
                                                    idade: e.target.value
                                                }
                                            })
                                        }}  
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Tipo Cliente</label>  
                                    <select 
                                        className="form-control"
                                        defaultValue={tipo}
                                        onChange={e => {
                                            this.setState({
                                                cliente:{
                                                    ...this.state.cliente,
                                                    tipo: e.target.value
                                                }
                                            })
                                        }} 
                                    >
                                        <option value="">Escolher...</option>
                                        <option value="PREMIUM">PREMIUM</option>
                                        <option value="BASICO">BÁSICO</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success float-right">Guardar Cambios</button>
                        </form>
                    )}
                    </Mutation>
            )      
    }
}
 

export default withRouter(FormularioEditar);