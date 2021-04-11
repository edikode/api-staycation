const Bank = require("../../models/Bank");

module.exports = {
  bankView: async (req, res) => {
    try {
      const bank = await Bank.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      res.render("backend/pages/bank/view", {
        title: "Catering Kita | Bank",
        alert,
        bank,
        user: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/admin/bank");
    }
  },
};
