import gql from 'graphql-tag';

export const NOVO_CLIENTE =gql`
  mutation criarCliente($data: ClientInput){
  createClient(data: $data){
    id
    nome
    apelido
  }
}

`;

export const ATUALIZAR_CLIENTE= gql`
  mutation AtualizaCliente($data: ClientInput){
    updateClient(data: $data){
      id
      nome
      apelido
      empresa
      tipo
      emails{
        email
      }
    }
  }
`;

export const EXCLUIR_CLIENTE = gql`
  mutation excluirCliente($id: ID!){
    deleteClient(id: $id)
  }
`;

export const NOVO_PRODUTO = gql`
  mutation novoProduto($data: ProdutoInput) {
    novoProduto(data:$data){
      nome
    }
  }
`;

export const EXCLUIR_PRODUTO = gql`
  mutation excluirProduto($id: ID!){
    excluirProduto(id: $id)
  }
`;

export const ATUALIZAR_PRODUTO = gql`
  mutation atuliazarProduto($data: ProdutoInput){
    atualizarProduto(data: $data){
      nome
      estoque
      preco
    }
  }
`;

export const PEDIDO_NOVO = gql`
  mutation novoPedido($data: PedidoInput){
    novoPedido(data: $data){
      total
      data
      pedido{
        id
        quantidade
      }
      cliente
    }
  }
`;
export const ATUALIZA_PEDIDO = gql`
  mutation atualizaPedido($input: PedidoInput){
    atualizaPedido(input: $input)
  }
`;

export const USUARIO_REGISTRO = gql`
  mutation createUsuario($usuario: String!, $nome: String!, $password: String!, $rol: String){
    createUsuario(usuario: $usuario, nome: $nome, password: $password,  rol: $rol)
  }
`;

export const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($usuario: String!, $password: String!){
    autenticarUsuario(usuario: $usuario, password: $password){
      token
    }
  }
`;