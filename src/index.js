const express = require("express");
const cors = require("cors");
const moviesFromJson = require("./data/movies.json");
const users = require("./data/users.json");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

//endpoint getId

server.get('/movie/:movieId', (req, res) => {
  const requestParamsMovie = req.params.movieId;
  const foundMovie = moviesFromJson.find(movie =>
    movie.id === requestParamsMovie);
  console.log(foundMovie.title);
});

// server.get("/posts/:slug", (req, res) => {
//   const requestParamsSlug = req.params.slug;
//   //buscarla información
//   const postData = posts.find(post => post.slug === requestParamsSlug);
//   postData.catList = postData.categories.split(",");
//   console.log(postData);
//   res.render("post", postData);
// });


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
