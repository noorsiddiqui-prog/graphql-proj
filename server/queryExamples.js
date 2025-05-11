// query GamesQuery {
//   games {
//     title
//   }
// }

// query ExampleQuery($id: ID!) {
//   review(id: $id) {
//     rating,
//     content
//   }
// }

// query reviewQuery($id: ID!) {
//   review(id: $id) {
//     rating,
//     game {
//       title,
//       platform
//     }
//   }
// }


// query ExampleQuery($id: ID!) {
//   review(id: $id) {
//     rating,
//     game {
//       title,
//       platform
//       reviews {
//         rating
//       }
//     },
//     author {
//       name
//       verified
//     }
//   }
// }


// mutation DeleteMutation($id: ID!){
//   deleteGame(id: $id) {
//     id,
//     title,
//     platform
//   }
// }
