const service = require("./production_companies.service");
const { verifyId, verifyYear } = require("./production_companies.verifier");

async function list(req, res, next) {
  const { production_id, year } = res.locals;
  if (production_id && year) {
    let name = "";
    let companyBudget = 0;
    let companyRevenue = 0;

    const result = await service.getProductionCompanyDetailsByYear(
      production_id,
      year
    );
    result.forEach((row) => {
      const { production_companies, budget, revenue } = row;
      const pcs = eval(production_companies);
      pcs.forEach((company) => {
        if (company.id === Number(production_id)) {
          if (!name) name = company.name;
          companyBudget += budget;
          companyRevenue += revenue;
        }
      });
    });
    const dollars = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    const targetCompany = {
      name,
      id: production_id,
      budget: dollars.format(companyBudget),
      revenue: dollars.format(companyRevenue),
      year,
    };

    if (targetCompany.name) {
      res.json(targetCompany);
    } else {
      res.json({ message: "no company found" });
    }
  } else {
    const companies = [];
    const result = await service.list();
    result.forEach((row) => {
      const pcs = eval(row.production_companies);
      pcs.forEach((company) => {
        if (!companies.find((comp) => comp.id === company.id)) {
          companies.push(company);
        }
      });
    });
    res.json(companies);
  }
}

module.exports = {
  list: [verifyId, verifyYear, list],
};
