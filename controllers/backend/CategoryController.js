const Category = require("../../models/Category");

module.exports = {
  categoryView: async (req, res) => {
    try {
      const category = await Category.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("backend/pages/category/view", {
        category,
        alert,
        title: "Catering Kita | Category",
        user: req.session.user,
      });
    } catch (error) {
      res.redirect("/admin/category");
    }
  },
};
