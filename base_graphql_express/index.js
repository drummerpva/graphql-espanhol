import express from 'express';
//graphql
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();

app.get('/', (req, res) => {
  res.send('Todo list!');
});

//resolver
const root = { hola: () => 'Olá Mundao GraphQL' };

app.use(
  '/graphql',
  graphqlHTTP({
    //qual schema vai usar
    schema,
    //os Resolver como roovalue
    rootValue: root,
    //utilizar o GraphiQL
    graphiql: true,
  })
);

app.listen(3000, () => console.log('Servidor rodando...'));
