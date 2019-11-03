import React from 'react';
import {Query} from 'react-apollo';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

import {TOP_VENDEDORES} from '../../../queries';

export default props => {


  return(
    <Query query={TOP_VENDEDORES} >
      {({loading, error, data}) => {
        if(loading) return 'Carrengando...';
        if(error) return `Erro: ${error.message}`;

        const topVendedoresGrafico = [];

        data.topVendedores.map((vendedor, index) => {
          topVendedoresGrafico[index] = {
            ...vendedor.vendedor[0],
            total: vendedor.total
          }
        });
        return(
          <BarChart
            width={900} height={500} data={topVendedoresGrafico}
            margin={{top:5, rigth: 30, left: 20, bottom: 5}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nome" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#6148b9" />
          

          </BarChart>
        );
      }}

    </Query>
  )
}