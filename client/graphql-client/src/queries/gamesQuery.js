import { gql } from "@apollo/client";

const GET_GAMES = gql`
  query GetGames {
    games {
      id
      title
      platform
      reviews {
        rating
        content
      }
    }
  }
`;

const ADD_GAME = gql`
  mutation AddGame($game: AddGameInput!) {
    addGame(game: $game) {
      id
      title
      platform
    }
  }
`;

export { GET_GAMES, ADD_GAME };