function verifyId(req, res, next) {
  const { production_id } = req.query;
  if (production_id) {
    if (isNaN(production_id)) {
      return next({
        status: 400,
        message: "The production Id must be a number",
      });
    }
    res.locals.production_id = production_id;
  }
  return next();
}

function verifyYear(req, res, next) {
  const { year } = req.query;
  if (year) {
    if (isNaN(year) || year < "") {
      return next({
        status: 400,
        message: "The value must be a valid year",
      });
    }
    res.locals.year = year;
  }
  return next();
}

module.exports = {
  verifyId,
  verifyYear,
};
