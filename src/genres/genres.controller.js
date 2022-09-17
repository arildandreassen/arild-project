const service = require("./genres.service");
const { verifyYear, verifyTop } = require("./genres.verifier");

async function list(req, res) {
  const { year, onlytop } = res.locals;
  let result;
  if (year) {
    result = await service.listGenresByYear(year);
  } else {
    result = await service.list();
  }

  const popularGenres = {};
  result.forEach((row) => {
    const { genres, popularity } = row;
    try {
      const jsonGenres = eval(genres);
      jsonGenres.forEach((genre) => {
        if (!popularGenres.hasOwnProperty(genre.name)) {
          popularGenres[genre.name] = {
            popularity: popularity,
            count: 1,
          };
        } else {
          const pop = popularGenres[genre.name].popularity;
          const existingCount = popularGenres[genre.name].count;
          popularGenres[genre.name] = {
            popularity: pop + popularity,
            count: existingCount + 1,
          };
        }
      });
    } catch (e) {
      //
    }
  });

  if (onlytop && onlytop === "true" && Object.keys(popularGenres).length) {
    let popularGenre = "";
    let popularScore = 0;
    const keys = Object.keys(popularGenres);

    for (const key of keys) {
      const currentGenre = popularGenres[key];

      if (currentGenre.popularity > popularScore) {
        popularGenre = key;
        popularScore = currentGenre.popularity;
      }
    }
    return res.json(popularGenre);
  }

  if (Object.keys(popularGenres).length) {
    res.json(popularGenres);
  } else {
    res.json({ message: "no genres found" });
  }
}

module.exports = {
  list: [verifyYear, verifyTop, list],
};
