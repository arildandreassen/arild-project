const db = require("../../db/connection");

async function list() {
  const result = await db.query("select production_companies from movies");
  return result.rows;
}

async function getProductionCompanyDetailsByYear(id, year) {
  const result = await db.query(
    `select production_companies, budget,revenue from movies where release_year = '${year}' `
  );
  return result.rows;
}

module.exports = {
  list,
  getProductionCompanyDetailsByYear,
};
