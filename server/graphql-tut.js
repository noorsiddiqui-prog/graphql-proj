import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import axios from "axios";

import { typeDefs } from "./schemas/schema.js";
import db from "./database/data.js";
import { connectDB } from "./database/connect.js";

await connectDB();

const resolvers = {
    Query: {
        games() {
            return db.games
        },
        authors() {
            return db.authors
        },
        reviews() {
            return db.reviews
        },
        review(_, args){
            console.log(args)
            return db.reviews.find((review) => {
                console.log(review.id, args.id)
                return review.id == args.id
            })
        },
        author(_, args){
            console.log(args)
            return db.authors.find((author) => {
                console.log(author.id, args.id)
                return author.id == args.id
            })
        },
        game(_, args){
            console.log(args)
            return db.games.find((game) => {
                console.log(game.id, args.id)
                return game.id == args.id
            })
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((r) => r.gameId == parent.id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((r) => r.authorId == parent.id)
        }
    },
    Review: {
        author(parent) {
            return db.authors.find((a) => a.id == parent.authorId)
        },
        game(parent) {
            const filteredGame = db.games.find((g) => {
              return g.id == parent.gameId;
            });
            return filteredGame || [];
        }
    },
    Mutation: {
        addGame(_, args){
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 10000).toString(),
            }
            db.games.push(game)
            return game
        },
        updateGame(_, args){
            db.games = db.games.map((g) => {
                if(g.id == args.id) {
                    return {
                        ...g,
                        ...args.edits
                    }
                }
                return g
            })
            return db.games.find((g) => g.id == args.id)
        },
        deleteGame(_, args){
            db.games = db.games.filter((g) => g.id != args.id)
            return db.games
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

// const {url} = await startStandaloneServer(server, {
//     listen: { port: 4000 },
// });

// console.log(`🚀  Server ready at: ${url}`);