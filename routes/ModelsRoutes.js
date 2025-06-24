const express = require("express");
const router = express.Router();
const modelsController = require("../controllers/modelController");
const { authenticate } = require("../error/authenicate");
const { validateModel } = require("../middle/modelShema");

router.post("/", authenticate, validateModel, modelsController.createModel);
router.get("/related/by-author",authenticate, modelsController.getOtherModelsByAuthor);
router.get("/related/others",authenticate, modelsController.getOtherModels);
router.get("/top-rated",authenticate, modelsController.getTopRatedModels);
router.get("/:id",authenticate, modelsController.getModelById);
router.put("/:id", validateModel, modelsController.updateModel);
router.delete("/:id", modelsController.deleteModel);
router.get("/",authenticate, modelsController.getAllModels);
router.get("/download/:filename", modelsController.downloadModel);

module.exports = router;
