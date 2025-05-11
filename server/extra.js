// // const express = require("express");
// // const { ApolloServer } = require("@apollo/server");
// // const bodyParser = require("body-parser");
// // const cors = require("cors");
// // const { expressMiddleware } = require("@apollo/server/express4");

// // async function startServer() {
// //   const app = express();
// //   const server = new ApolloServer({
// //     typeDefs: `
// //         type Product {
// //             id: ID!
// //             title: String!
// //             price: Float!
// //         }

// //         type Query {
// //             getProducts: [Product!]
// //         }
// //     `,
// //     resolvers: {

// //     },
// //   });

// //   app.use(express.json());
// //   app.use(cors());

// //   await server.start();

// //   app.use(
// //     "/graphql",
// //     express.json(), // Ensure JSON parsing is applied here
// //     cors(), // Ensure CORS is applied here
// //     expressMiddleware(server)
// //   );

// //   app.listen(8000, () => {
// //     console.log("Server is running on http://localhost:8000/graphql");
// //   });
// // }

// // startServer();

// // npm install @apollo/server express graphql cors
// const { ApolloServer } = require('@apollo/server');
// const { expressMiddleware } = require('@apollo/server/express4');
// const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
// const express = require('express');
// const http = require('http');
// const cors = require('cors');
// // const { typeDefs, resolvers } = require('./schema');

// // Required logic for integrating with Express
// const app = express();
// const httpServer = http.createServer(app);

// // Apollo Server initialization
// const server = new ApolloServer({
//   typeDefs: `
//         type Product {
//             id: ID!
//             title: String!
//             price: Float!
//         }

//         type Query {
//             getProducts: [Product!]
//         }
//     `,
//     resolvers: {

//     },
//   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
// });

// async function startServer() {
//   await server.start();

//   app.use(
//     '/graphql',
//     cors(),
//     express.json(),
//     expressMiddleware(server, {
//       context: async ({ req }) => ({ token: req.headers.token }),
//     })
//   );

//   await new Promise((resolve) => httpServer.listen({ port: 8000 }, resolve));
//   console.log(`🚀 Server ready at http://localhost:8000/`);
// }

// startServer();

// const { ApolloServer } = require("@apollo/server");
// const { expressMiddleware } = require("@apollo/server/express4");
// const { startStandaloneServer } = require("@apollo/server/standalone")
// const {
//   ApolloServerPluginDrainHttpServer,
// } = require("@apollo/server/plugin/drainHttpServer");
// const express = require("express");
// const http = require("http");
// const cors = require("cors");

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import axios from "axios";

const app = express();
const httpServer = http.createServer(app);

// const server = new ApolloServer({
//   typeDefs: `
//     type Product {
//       id: ID!
//       title: String!
//       price: Float!
//     }

//     type Query {
//       getProducts: [Product!]
//     }
//   `,
//   resolvers: {
//     Query: {
//       getProducts: () => [
//         { id: "1", title: "Product A", price: 29.99 },
//         { id: "2", title: "Product B", price: 49.99 },
//       ],
//     },
//   },
//   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
// });

async function startServer() {
  await server.start();

  // Global middlewares applied first
  app.use(cors());
  app.use(express.json());

  // Apollo middleware (after the above middlewares)
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  await new Promise((resolve) => httpServer.listen({ port: 8000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:8000/graphql`);
}

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.

  type User {
    id: ID!
    username: String!
    email: String! 
  }

  type Product {
    id: ID!
    title: String!
    description: String!
    price: Float!
    category: String!
    user: User
  }


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    getProducts: [Product]!
    getUsers: [User]!
    getUser(id: ID!): User
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Product: {
        user: async(product) => {
            const res = await axios(`https://fakestoreapi.com/users/${product.id}`);
            const data = res.data;
            return data;
        }
    },
  Query: {
    // getProducts: () => [{id: "1", title: "Product A", description: "Description A", price: 29.99, category: "Category A"},
    //   {id: "2", title: "Product B", description: "Description B", price: 49.99, category: "Category B"},
    //   {id: "3", title: "Product C", description: "Description C", price: 19.99, category: "Category C"},
    // ],
    getProducts: async () => {
      const res = await axios("https://fakestoreapi.com/products");
      const data = res.data;
      return data;
    },
    getUsers: async () => {
      const res = await axios("https://fakestoreapi.com/users");
      const data = res.data;
      return data;
    },
    getUser: async (parent, { id }) => {
      const res = await axios(`https://fakestoreapi.com/users/${id}`);
      const data = res.data;
      return data;
    },
  },
};

// startServer();
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 8000 },
});

console.log(`🚀  Server ready at: ${url}`);
