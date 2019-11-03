import React, { Component } from 'react';


export default class Paginador extends Component {
  state ={
    paginador:{
      paginas: Math.ceil(Number(this.props.totalClientes) / this.props.limite)
    }
  };
  
  render() {
    const { atual} = this.props;
    const btnAnterior = (atual > 1) ? <button onClick={this.props.paginaAnterior} type="button" className="btn btn-success mr-2" >
      &laquo; Anterior
    </button> : '';
    //botão seguinte
    const {paginas} = this.state.paginador;
    const btnSeguinte = (atual !== paginas) ? <button onClick={this.props.paginaSeguinte} type="button" className="btn btn-success" >
    Seguinte &raquo;
  </button> : '';



    return(
      <div className="mt-5 d-flex justify-content-center">
        {btnAnterior}
        {btnSeguinte}
      </div>
    );
  }
}
