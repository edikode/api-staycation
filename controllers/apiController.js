const Category = require("../models/Category");

module.exports = {
  dashboardApi: (req, res) => {
    const message = "Welcome to api Staycation v1";
    res.status(200).json({ message });
  },

  categoryIndex: async (req, res) => {
    try {
      const category = await Category.find();

      res.status(200).json({ category });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  categoryDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });

      res.status(200).json({ category });
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.id,
        });
      }

      return res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },

  categoryCreate: async (req, res) => {
    try {
      const { name } = req.body;
      // Validate request
      if (!name) {
        return res.status(400).send({
          message: "Name Category can not be empty",
        });
      }
      const data = await Category.create({ name });

      res.status(200).send(data);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note.",
      });
    }
  },

  categoryUpdate: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      if (!name) {
        return res.status(400).send({
          message: "Category Name can not be empty",
        });
      }

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
      return res.status(500).send({
        message: "Error updating category with id " + id,
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
      return res.status(500).send({
        message: "Could not delete Category with id " + req.params.id,
        error: err,
      });
    }
  },
};
