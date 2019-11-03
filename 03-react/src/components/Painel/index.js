import React from 'react';

import Clientes from './Clientes';
import Vendedores from './Vendedores';

export default props => (
  <>
    <h1 className="text-center my-5">Top 10 clientes que mais compram</h1>
    <Clientes />
    <Vendedores />
  </>
)