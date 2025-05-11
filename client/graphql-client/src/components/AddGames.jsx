import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_GAME, GET_GAMES } from "../queries/gamesQuery";

const AddGameForm = () => {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");

  const [addGame] = useMutation(ADD_GAME, {
    refetchQueries: [{ query: GET_GAMES }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const platformArray = platform.split(",").map((p) => p.trim());
    addGame({ variables: { game: { title, platform: platformArray } } });
    setTitle("");
    setPlatform("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-2xl p-6 mb-8 border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Add a New Game
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Title</label>
        <input
          type="text"
          placeholder="Enter game title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Platforms
        </label>
        <input
          type="text"
          placeholder="Comma separated (e.g. PC, Xbox)"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
      >
        Add Game
      </button>
    </form>
  );
};

export default AddGameForm;
