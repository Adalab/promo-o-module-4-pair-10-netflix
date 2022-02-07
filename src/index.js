const express = require("express");
const cors = require("cors");
const moviesFromJson = require("./data/movies.json");
const users = require("./data/users.json");
const Database = require("better-sqlite3");




// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// motor de plantillas
server.set('view engine', 'ejs');

//endpoint getId

server.get('/movie/:movieId', (req, res) => {
  const requestParamsMovie = req.params.movieId;
  const foundMovie = moviesFromJson.find(movie =>
    movie.id === requestParamsMovie);
  console.log(foundMovie.title);
  res.render("movie", foundMovie);
});

const db = new Database("./src/db/database.db", {});


//servidores de estáticos
const staticServerPath = "./src/public-react";
server.use(express.static(staticServerPath));

const staticServerPathImages = "./src/public-movies-images";
server.use(express.static(staticServerPathImages));

// const staticStylesPath = "./src/public-react/static/css.css” "

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});


//endpoint get movies

server.get("/movies", (req, res) => {
  const query = db.prepare("SELECT * FROM movies ORDER BY name");
  const allMovies = query.all();
  console.log(allMovies);
  // res.json(allMovies);
});


// server.get("/movies", (req, res) => {
//   const response = {
//     success: true,
//     movies: moviesFromJson,
//   };
//   res.json(response);
// });

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

  if (findUsers) {
    res.json({
      success: true,
      userId: findUsers.id,
    });
  } else {
    console.log("NO ERES USUARIA");
    res.json({
      success: false,
      errorMessage: "Usuario no encontrado",
    });
  }
});
