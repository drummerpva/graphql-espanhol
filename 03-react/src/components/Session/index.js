import React from 'react';
import {Query} from 'react-apollo';
import {USUARIO_ATUAL} from '../../queries';

export default Component => props => (
  <Query query={USUARIO_ATUAL} >
    {({loading, error, data, refetch}) => {
      if(loading) return null;
      return <Component  {...props} refetch={refetch} session={data} />;
    }}
  </Query>
);