import express from 'express';
//graphql
import graphqlHTTP from 'express-graphql';
import { schema } from './data/schema';

//resolvers

const app = express();

app.get('/', (req, res) => {
  res.send('Todo list!');
});

app.use(
  '/graphql',
  graphqlHTTP({
    //qual schema vai usar
    schema,
    //utilizar o GraphiQL
    graphiql: true,
  })
);

app.listen(3000, () => console.log('Servidor rodando...'));
