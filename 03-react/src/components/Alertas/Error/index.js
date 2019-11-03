import React from 'react';

// import { Container } from './styles';

export default ({error}) => {
  if(error.message) error = error.message;
  return(
    <p className="alert alert-danger text-center p-2 mb-2">{error}</p>
  );
}
