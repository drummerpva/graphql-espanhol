import React from 'react';

export default function Concluido({mensagem}) {
  return (
    <p className="alert alert-success py-3 text-center" >
      {mensagem}
    </p>
  );
}
