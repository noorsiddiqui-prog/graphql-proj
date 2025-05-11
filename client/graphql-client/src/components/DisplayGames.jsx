import React from "react";
import { useQuery } from "@apollo/client";
import { GET_GAMES } from "../queries/gamesQuery";
import AddGameForm from "./AddGames";

const DisplayGames = () => {
  const { loading, error, data } = useQuery(GET_GAMES);

  if (loading)
    return <p className="text-gray-500 text-center mt-4">Loading...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center mt-4">Error: {error.message}</p>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <AddGameForm />

      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Games
      </h1>

      <div className="grid gap-6">
        {data?.games?.map((game) => (
          <div
            key={game.id}
            className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {game.title}
            </h2>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Platforms:</span>{" "}
              {game.platform.join(", ")}
            </p>

            {game.reviews.length > 0 ? (
              <div className="mt-2 space-y-2">
                {game.reviews.map((review, index) => (
                  <div key={index} className="bg-gray-100 p-3 rounded-md">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Rating:</span>{" "}
                      {review.rating}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Review:</span>{" "}
                      {review.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-2">No reviews yet.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayGames;
