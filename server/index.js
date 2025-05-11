import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schemas/schema.js";
import { connectDB } from "./database/connect.js";
import { Game } from "./models/Game.js";
import { Author } from "./models/Author.js";
import { Review } from "./models/Review.js";

await connectDB();

const resolvers = {
  Query: {
    games: async () => await Game.find(),
    game: async (_, args) => await Game.findById(args.id),
    authors: async () => await Author.find(),
    author: async (_, args) => await Author.findById(args.id),
    reviews: async () => await Review.find(),
    review: async (_, args) => await Review.findById(args.id),
  },
  Game: {
    reviews: async (parent) => await Review.find({ gameId: parent.id }),
  },
  Author: {
    reviews: async (parent) => await Review.find({ authorId: parent.id }),
  },
  Review: {
    game: async (parent) => await Game.findById(parent.gameId),
    author: async (parent) => await Author.findById(parent.authorId),
  },
  Mutation: {
    addGame: async (_, { game }) => {
      const newGame = new Game(game);
      await newGame.save();
      return newGame;
    },

    updateGame: async (_, { id, edits }) => {
      return await Game.findByIdAndUpdate(id, edits, { new: true });
    },

    deleteGame: async (_, { id }) => {
      await Game.findByIdAndDelete(id);
      return await Game.find();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
