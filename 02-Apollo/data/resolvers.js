import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Clientes, Produtos, Pedidos, Usuarios } from "./db";
import { rejects } from "assert";
const ObjectId = mongoose.Types.ObjectId;

dotenv.config({ path: ".env" });

const createToken = (user, secret, expiresIn) => {
  const { usuario } = user;
  return jwt.sign({ usuario }, secret, { expiresIn });
};

//resolvers
export const resolvers = {
  Query: {
    getClient: (_, { id }) => {
      return new Promise((resolve, object) => {
        Clientes.findById(id, (e, cli) => (e ? rejects(e) : resolve(cli)));
      });
    },
    getClients: (_, { limit, offset, vendedor }) => {
      let filtro;
      if (vendedor) filtro = { vendedor: new ObjectId(vendedor) };
      return Clientes.find(filtro)
        .limit(limit)
        .skip(offset);
    },
    totalClients: (_, { vendedor }) => {
      return new Promise((res, rej) => {
        let filtro;
        if (vendedor) filtro = { vendedor: new ObjectId(vendedor) };
        Clientes.countDocuments(filtro, (e, count) => {
          if (e) rej(e);
          else res(count);
        });
      });
    },
    totalProdutos: root => {
      return new Promise((res, rej) => {
        Produtos.countDocuments({}, (e, count) => {
          if (e) rej(e);
          else res(count);
        });
      });
    },
    getProdutos: (_, { limit, offset, estoque }) => {
      let filtro;
      if (estoque) {
        filtro = { estoque: { $gt: 0 } };
      }
      return Produtos.find(filtro)
        .limit(limit)
        .skip(offset);
    },
    getProduto: (_, { id }) => {
      return new Promise((res, obj) => {
        Produtos.findById(id, (e, produto) => {
          if (e) rejects(e);
          else res(produto);
        });
      });
    },
    getPedidos: (_, { cliente }) => {
      return new Promise((resolve, obj) => {
        Pedidos.find({ cliente }, (e, pedido) => {
          if (e) rejects(e);
          else resolve(pedido);
        });
      });
    },
    topClientes: root => {
      return new Promise((res, obj) => {
        Pedidos.aggregate(
          [
            {
              $match: { status: "COMPLETADO" }
            },
            {
              $group: {
                _id: "$cliente",
                total: { $sum: "$total" }
              }
            },
            {
              $lookup: {
                from: "clientes",
                localField: "_id",
                foreignField: "_id",
                as: "cliente"
              }
            },
            {
              $sort: { total: -1 }
            },
            {
              $limit: 10
            }
          ],
          (err, resultado) => {
            if (err) rejects(err);
            else res(resultado);
          }
        );
      });
    },
    topVendedores: () => {
      return new Promise((res, obj) => {
        Pedidos.aggregate(
          [
            {
              $match: { status: "COMPLETADO" }
            },
            {
              $group: {
                _id: "$vendedor",
                total: { $sum: "$total" }
              }
            },
            {
              $lookup: {
                from: "usuarios",
                localField: "_id",
                foreignField: "_id",
                as: "vendedor"
              }
            },
            {
              $sort: { total: -1 }
            },
            {
              $limit: 10
            }
          ],
          (err, resultado) => {
            if (err) rejects(err);
            else res(resultado);
          }
        );
      });
    },
    getUsuario: (_, __, { usuarioAtual }) => {
      if (!usuarioAtual) return null;

      const usuario = Usuarios.findOne({ usuario: usuarioAtual.usuario });

      return usuario;
    }
  },
  Mutation: {
    createClient: (_, { data }) => {
      console.log(data);
      const novoCliente = new Clientes({
        nome: data.nome,
        apelido: data.apelido,
        empresa: data.empresa,
        emails: data.emails,
        idade: data.idade,
        tipo: data.tipo,
        pedidos: data.pedidos,
        vendedor: data.vendedor
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
          e ? rejects(e) : resolve("Cliente excluido com sucesso!")
        );
      });
    },
    novoProduto: (_, { data }) => {
      const novoProduto = new Produtos({
        nome: data.nome,
        preco: data.preco,
        estoque: data.estoque
      });

      novoProduto.id = novoProduto._id;

      return new Promise((res, obj) => {
        novoProduto.save(e => {
          if (e) rejects(e);
          else res(novoProduto);
        });
      });
    },
    atualizarProduto: (_, { data }) => {
      return new Promise((res, obj) => {
        Produtos.findOneAndUpdate(
          { _id: data.id },
          data,
          { new: true },
          (e, produto) => {
            if (e) rejects(e);
            else res(produto);
          }
        );
      });
    },
    excluirProduto: (_, { id }) => {
      return new Promise((res, obj) => {
        Produtos.findOneAndRemove({ _id: id }, e => {
          if (e) rejects(e);
          else res("Produto excluido com sucesso!");
        });
      });
    },
    novoPedido: (_, { data }) => {
      const novoPedido = new Pedidos({
        pedido: data.pedido,
        total: data.total,
        data: new Date(),
        cliente: data.cliente,
        status: "PENDENTE",
        vendedor: data.vendedor
      });
      novoPedido.id = novoPedido._id;

      return new Promise((res, obj) => {
        novoPedido.save(e => (e ? rejects(e) : res(novoPedido)));
      });
    },
    atualizaPedido: (_, { input }) => {
      return new Promise((res, obj) => {
        const { status } = input;
        let instrucao;
        if (status === "COMPLETADO") instrucao = "-";
        else if (status === "CANCELADO") instrucao = "+";

        input.pedido.forEach(ped => {
          Produtos.updateOne(
            { _id: ped.id },
            {
              $inc: {
                estoque: `${instrucao}${ped.quantidade}`
              }
            },
            e => {
              if (e) return new Error(e);
            }
          );
        });

        Pedidos.findOneAndUpdate({ _id: input.id }, input, { new: true }, e => {
          if (e) rejects(e);
          else res("Pedido atualizado com sucesso.");
        });
      });
    },
    createUsuario: async (_, { usuario, password, rol, nome }) => {
      //verificar se ja existe usuario
      const existeUsuario = await Usuarios.findOne({ usuario });
      if (existeUsuario) throw new Error(`Usuário ja existe, tente outro!`);

      const novoUsuario = await new Usuarios({
        usuario,
        nome,
        password,
        rol
      }).save();
      return "Usuário inserido com sucesso!";
    },
    autenticarUsuario: async (_, { usuario, password }) => {
      const nomeUsuario = await Usuarios.findOne({ usuario });
      if (!nomeUsuario) throw new Error(`Usuario/senha inválidos!`);

      const passwordCorreto = await bcrypt.compare(
        password,
        nomeUsuario.password
      );
      if (!passwordCorreto) throw new Error(`Usuario/senha inválidos!`);
      return { token: createToken(nomeUsuario, process.env.JWT_SECRET, "1h") };
    }
  }
};
