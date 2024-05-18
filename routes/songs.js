const express = require("express");
const path = require("path");
const regValidate = require("../utilities/validation");

const router = express.Router();
const songsController = require("../controllers/songs");

router.get("/", songsController.getAll);

router.get("/:id", songsController.getSingle);

router.post(
  "/",
  regValidate.registationRules(),
  regValidate.checkRegData,
  songsController.createsong
);

router.put(
  "/:id",
  regValidate.registationRules(),
  regValidate.checkRegData,
  songsController.updatesong
);

router.delete("/:id", songsController.deletesong);

module.exports = router;
