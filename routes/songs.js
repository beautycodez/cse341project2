const express = require("express");
const path = require("path");
const regValidate = require("../utilities/validation");

const router = express.Router();
const songsController = require("../controllers/songs");
const {requiresAuth} = require('express-openid-connect')

router.get("/",requiresAuth(), songsController.getAll);

router.get("/:id", requiresAuth(), songsController.getSingle);

router.post(
  "/",
  requiresAuth(),
  regValidate.registationRules(),
  regValidate.checkRegData,
  songsController.createsong
);

router.put(
  "/:id",
  requiresAuth(),
  regValidate.registationRules(),
  regValidate.checkRegData,
  songsController.updatesong
);

router.delete("/:id", requiresAuth(), songsController.deletesong);

module.exports = router;
