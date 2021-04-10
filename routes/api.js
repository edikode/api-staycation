const router = require("express").Router();
const apiController = require("../controllers/apiController");

router.get("/dashboard", apiController.dashboardApi);
router.get("/category", apiController.categoryIndex);
router.get("/category/:id", apiController.categoryDetail);
router.post("/category/create", apiController.categoryCreate);
router.put("/category/update/:id", apiController.categoryUpdate);
router.delete("/category/delete/:id", apiController.categoryDelete);

module.exports = router;
