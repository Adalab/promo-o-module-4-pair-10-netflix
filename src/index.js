const express = require("express");
const cors = require("cors");
const moviesFromJson = require("./data/movies.json");
const users = require("./data/users.json");

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
  const response = {
    success: true,
    movies: moviesFromJson,
  };
  res.json(response);
});

//endpoint get users
server.post("/login", (req, res) => {
  // const listOfUsers = {
  //   success: true,
  //   users: users,
  // };

  // res.json(listOfUsers);
  const findUsers = users.find(
    (user) =>
      user.email === req.body.email && user.password === req.body.password
  );

  if (findUsers !== "") {
    res.json({
      success: true,
      userId: findUsers.id,
    });
  } else {
    res.json({
      sucess: false,
      errorMessage: "usuario/a no encontrado/a",
    });
    console.log("NO ERES USUARIA");
  }
});
