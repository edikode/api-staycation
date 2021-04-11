const router = require("express").Router();

const dashboardController = require("../controllers/api/DashboardController");
const categoryController = require("../controllers/api/CategoryController");
const bankController = require("../controllers/api/BankController");
const itemController = require("../controllers/api/ItemsController");

router.get("/", dashboardController.dashboardApi);
router.get("/dashboard", dashboardController.dashboardApi);
// category
router.get("/category", categoryController.categoryIndex);
router.get("/category/:id", categoryController.categoryDetail);
router.post("/category/create", categoryController.categoryCreate);
router.put("/category/update/:id", categoryController.categoryUpdate);
router.delete("/category/delete/:id", categoryController.categoryDelete);
// bank
router.get("/bank", bankController.bankIndex);
router.get("/bank/:id", bankController.bankDetail);
router.post("/bank/create", bankController.bankCreate);
router.put("/bank/update/:id", bankController.bankUpdate);
router.delete("/bank/delete/:id", bankController.bankDelete);
// bank
router.get("/items", itemController.itemIndex);
router.get("/item/:id", itemController.itemDetail);
router.post("/item/create", itemController.itemCreate);
router.put("/item/update/:id", itemController.itemUpdate);
router.delete("/item/delete/:id", itemController.itemDelete);

module.exports = router;
