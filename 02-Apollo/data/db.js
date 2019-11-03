import mongoose from "mongoose";
import bcrypt from "bcryptjs";

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://192.168.0.121/clientes", {
  useNewUrlParser: true
});

//Definir o schema de clientes

const clientesSchema = new mongoose.Schema({
  nome: String,
  apelido: String,
  empresa: String,
  emails: Array,
  idade: Number,
  tipo: String,
  pedidos: Array,
  vendedor: mongoose.Types.ObjectId
});

const Clientes = mongoose.model("clientes", clientesSchema);

//Produtos
const produtosSchema = new mongoose.Schema({
  nome: String,
  preco: Number,
  estoque: Number
});
const Produtos = mongoose.model("produtos", produtosSchema);

//Pedidos
const PedidosSchema = new mongoose.Schema({
  pedido: Array,
  total: Number,
  data: Date,
  cliente: mongoose.Types.ObjectId,
  status: String,
  vendedor: mongoose.Types.ObjectId
});

const Pedidos = mongoose.model("pedidos", PedidosSchema);

//Usuarios
const usuariosSchema = new mongoose.Schema({
  usuario: String,
  nome: String,
  password: String,
  rol: String
});

usuariosSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

const Usuarios = mongoose.model("usuarios", usuariosSchema);

export { Clientes, Produtos, Pedidos, Usuarios };
