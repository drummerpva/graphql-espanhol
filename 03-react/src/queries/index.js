import gql from 'graphql-tag';
export const CLIENTES_QUERY =  gql`
  query getClients($limit: Int, $offset: Int, $vendedor: String){
    getClients(limit: $limit, offset: $offset, vendedor: $vendedor){
      id
      nome
      apelido
      empresa
    }
    totalClients(vendedor: $vendedor)
  }
`;

export const CLIENTE_QUERY = gql`
  query ConsultarCliente($id: ID!){
  getClient(id: $id){
    id
    nome
    apelido
    empresa
    idade
    tipo
    emails{
      email
    }
  }
}
`;

export const PRODUTOS_QUERY =gql`
query getProdutos($limit: Int, $offset: Int, $estoque: Boolean){
    getProdutos(limit: $limit, offset: $offset, estoque: $estoque){
      id
      nome
      preco
      estoque
    }
    totalProdutos
  }
`;

export const PRODUTO_QUERY = gql`
  query getProduto($id: ID!){
    getProduto(id:$id){
      nome
      estoque
      preco
    }
  }
`;

export const PEDIDOS_QUERY = gql`
  query getPedidos($cliente: String){
    getPedidos(cliente: $cliente){
      id
      total
      data
      status
      pedido{
        id
        quantidade
      }
    }
}
`;

export const TOP_CLIENTES = gql`
  query topClientes {
    topClientes{
      total
      cliente{
        nome
      }
    }
  }
`;

export const TOP_VENDEDORES = gql`
  query topVendedores{
    topVendedores{
      total
      vendedor{
        nome
      }
    }
  }
`;

export const USUARIO_ATUAL = gql`
  query getUsuario{
    getUsuario{
      id
      usuario
      nome
      rol
    }
  }
`;