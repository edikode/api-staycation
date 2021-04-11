const router = require("express").Router();

const dashboardController = require("../controllers/backend/DashboardController");
const categoryController = require("../controllers/backend/CategoryController");
const bankController = require("../controllers/backend/BankController");
const itemsController = require("../controllers/backend/ItemsController");
const bookingController = require("../controllers/backend/BookingController");

// router.get("/", dashboardController.dashboardView);
router.get("/dashboard", dashboardController.dashboardView);
router.get("/category", categoryController.categoryView);
router.get("/bank", bankController.bankView);
router.get("/items", itemsController.itemsView);
router.get("/booking", bookingController.bookingView);

module.exports = router;
