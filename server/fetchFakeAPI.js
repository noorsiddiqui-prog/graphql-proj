import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import axios from "axios";

// Define GraphQL schema
const typeDefs = `#graphql
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

  type Query {
    getProducts: [Product]!
    getUsers: [User]!
    getUser(id: ID!): User
  }
`;

// Define resolvers
const resolvers = {
  Product: {
    user: async (product) => {
      try {
        console.log(`Fetching user for product ${product}`);
        // Simulate user ownership by using a calculated user ID
        const userId = (parseInt(product.id) % 10) + 1; // 1–10
        const res = await axios(`https://fakestoreapi.com/users/${userId}`);
        console.log(`Fetched user for product ${product.id}:`, res.data);
        return res.data;
      } catch (error) {
        console.error(
          `Error fetching user for product ${product.id}:`,
          error.message
        );
        return null;
      }
    },
  },
  Query: {
    getProducts: async () => {
      try {
        const res = await axios("https://fakestoreapi.com/products");
        console.log("products", res.data);
        return res.data;
      } catch (error) {
        console.error("Error fetching products:", error.message);
        return [];
      }
    },
    getUsers: async () => {
      try {
        const res = await axios("https://fakestoreapi.com/users");
        return res.data;
      } catch (error) {
        console.error("Error fetching users:", error.message);
        return [];
      }
    },
    getUser: async (_parent, { id }) => {
      try {
        const res = await axios(`https://fakestoreapi.com/users/${id}`);
        console.log(res.data);
        return res.data;
      } catch (error) {
        console.error(`Error fetching user ${id}:`, error.message);
        return null;
      }
    },
  },
};

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
const { url } = await startStandaloneServer(server, {
  listen: { port: 8000 },
});

console.log(`🚀 Server ready at: ${url}`);
