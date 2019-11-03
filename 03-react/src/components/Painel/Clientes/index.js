import React from 'react';
import {Query} from 'react-apollo';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

import {TOP_CLIENTES} from '../../../queries';

export default props => {


  return(
    <Query query={TOP_CLIENTES} >
      {({loading, error, data}) => {
        if(loading) return 'Carrengando...';
        if(error) return `Erro: ${error.message}`;

        const topClientesGrafico = [];

        data.topClientes.map((ped, index) => {
          topClientesGrafico[index] = {
            ...ped.cliente[0],
            total: ped.total
          }
        });
        return(
          <BarChart
            width={900} height={500} data={topClientesGrafico}
            margin={{top:5, rigth: 30, left: 20, bottom: 5}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nome" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#10a98b" />
          

          </BarChart>
        );
      }}

    </Query>
  )
}