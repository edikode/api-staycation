const Category = require("../../models/Category");

module.exports = {
  categoryIndex: async (req, res) => {
    try {
      const category = await Category.find();

      res.status(200).json({ category });
    } catch (error) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the Category.",
      });
    }
  },

  categoryDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });

      if (!category) {
        return res.status(404).send({
          message: "Category not found with id " + id,
        });
      }

      res.status(200).json({ category });
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Category not found with id " + err.value,
        });
      }

      return res.status(500).send({
        message:
          err.message || "Some error occurred while getting the Category.",
      });
    }
  },

  categoryCreate: async (req, res) => {
    try {
      const { name } = req.body;

      const data = await Category.create({ name });

      res.status(200).send(data);
    } catch (err) {
      // error bad request => all
      if (err.errors) {
        return res.status(400).send({
          error: err.errors,
        });
      }

      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category.",
      });
    }
  },

  categoryUpdate: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const category = await Category.findOne({ _id: id });
      if (!category) {
        return res.status(404).send({
          message: "Category not found with id " + id,
        });
      }

      category.name = name;
      await category.save();

      res.status(200).send(category);
    } catch (err) {
      // error Category Id
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Category not found with id " + err.value,
        });
      }
      // error bad request => all
      if (err.errors) {
        return res.status(400).send({
          error: err.errors,
        });
      }

      return res.status(500).send({
        message:
          err.message || "Some error occurred while updating the Category.",
        errorAll: err,
      });
    }
  },

  categoryDelete: async (req, res) => {
    try {
      const { id } = req.params;

      const category = await Category.findOne({ _id: id });
      if (!category) {
        return res.status(404).send({
          message: "Category not found with id " + id,
        });
      }

      await category.remove();

      res.send({ message: "Category deleted successfully!" });
    } catch (err) {
      // error Category Id
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Category not found with id " + err.value,
        });
      }

      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting the Category.",
      });
    }
  },
};
