const express = require("express");
const cors = require("cors");
const moviesFromJson = require("./data/movies.json");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

//servidores de estáticos
const staticServerPath = "./src/public-react";
server.use(express.static(staticServerPath));

const staticServerPathImages = "./src/public-movies-images";
server.use(express.static(staticServerPathImages));

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

//endpoint get movies
server.get("/movies", (req, res) => {
  console.log("Petición a la ruta GET /users");

  const response = {
    success: true,
    movies: moviesFromJson,
  };
  res.json(response);
});
