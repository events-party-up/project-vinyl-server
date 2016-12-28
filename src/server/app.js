import express from 'express';
import mongoose from './util/mongoose.util.js';
import graphqlHTTP from 'express-graphql';
import schema from './graphQLschema/index';
import jwtUtil from './util/jwt.util';
import config from 'config';

const apiServer = express();

const PORT = process.env.PORT || config.SERVER.PORT;

mongoose.connect();

apiServer.use('/graphql', jwtUtil.apiProtector, graphqlHTTP((request) => {
  const startTime = Date.now();
  return {
    schema: schema,
    graphiql: true,
    rootValue: { request },
    extensions() {
      return { runTime: `${Date.now() - startTime}ms` };
    },
  };
}));

apiServer.listen(PORT, () => {
  console.log(`Pingsters api server listening on port ${PORT}!`);
});