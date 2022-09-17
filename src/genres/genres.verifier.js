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

function verifyTop(req, res, next) {
  const { onlytop } = req.query;
  if (onlytop) {
    if (!["true", "false"].includes(onlytop)) {
      return next({
        status: 400,
        message: "onlytop must be either true or false",
      });
    }
    res.locals.onlytop = onlytop;
  }
  return next();
}

module.exports = {
  verifyYear,
  verifyTop,
};
