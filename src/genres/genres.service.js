const db = require("../../db/connection");

async function list() {
  const result = await db.query("select genres, popularity from movies ");
  return result.rows;
}

async function listGenresByYear(year) {
  const result = await db.query(
    `select genres, popularity from movies where release_year = '${year}'`
  );
  return result.rows;
}

module.exports = {
  list,
  listGenresByYear,
};
