import mongoose from 'mongoose';
import { Clientes } from './db';
import { rejects } from 'assert';

//resolvers
export const resolvers = {
  Query: {
    getClient: (_, { id }) => {
      return new Promise((resolve, object) => {
        Clientes.findById(id, (e, cli) => (e ? rejects(e) : resolve(cli)));
      });
    },
    getClients: (_, { limit }) => {
      return Clientes.find({}).limit(limit);
    },
  },
  Mutation: {
    createClient: (_, { data }) => {
      const novoCliente = new Clientes({
        nome: data.nome,
        apelido: data.apelido,
        empresa: data.empresa,
        emails: data.emails,
        idade: data.idade,
        tipo: data.tipo,
        pedidos: data.pedidos,
      });
      novoCliente.id = novoCliente._id;

      return new Promise((resolve, object) => {
        novoCliente.save(e => (e ? rejects(e) : resolve(novoCliente)));
      });
    },
    updateClient: (_, { data }) => {
      return new Promise((resolve, object) => {
        Clientes.findOneAndUpdate(
          { _id: data.id },
          data,
          { new: true },
          (e, cli) => (e ? rejects(e) : resolve(cli))
        );
      });
    },
    deleteClient: (_, { id }) => {
      return new Promise((resolve, object) => {
        Clientes.findOneAndRemove({ _id: id }, e =>
          e ? rejects(e) : resolve('Excluido com sucesso!')
        );
      });
    },
  },
};
