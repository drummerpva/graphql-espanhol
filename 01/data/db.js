import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://192.168.0.121/clientes', {
  useNewUrlParser: true,
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
});

const Clientes = mongoose.model('clientes', clientesSchema);

export { Clientes };
