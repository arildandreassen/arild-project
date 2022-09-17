const router = require("express").Router();
const controller = require("./genres.controller");

router.route("/").get(controller.list);

module.exports = router;
