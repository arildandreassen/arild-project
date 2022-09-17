const router = require("express").Router();
const controller = require("./production_companies.controller");

router.route("/").get(controller.list);

module.exports = router;
