// login

const getMoviesFromApi = (data) => {
  console.log(data);

  console.log("Se están pidiendo las películas de la app");
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  const queryParams = `?gender=${data.gender}`;

  return fetch(`http://localhost:4000/movies${queryParams}`)
    .then((response) => response.json())
    .then((dataMovies) => {
      return dataMovies;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
