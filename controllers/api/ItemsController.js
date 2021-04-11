const Item = require("../../models/Item");
const Category = require("../../models/Category");

module.exports = {
  itemIndex: async (req, res) => {
    try {
      const items = await Item.find().populate({
        path: "categoryId",
        select: "id name",
      });

      res.status(200).json({ items });
    } catch (error) {
      res.status(500).send({
        message: err.message || "Some error occurred while getting the Items.",
      });
    }
  },

  itemDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findOne({ _id: id }).populate({
        path: "categoryId",
        select: "id name",
      });

      if (!item) {
        return res.status(404).send({
          message: "Item not found with id " + id,
        });
      }

      res.status(200).json({ item });
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Item not found with id " + err.value,
        });
      }

      res.status(500).send({
        message: err.message || "Some error occurred while getting the Item.",
      });
    }
  },

  itemCreate: async (req, res) => {
    try {
      const { title, price, country, city, description, categoryId } = req.body;

      // check category
      const category = await Category.findOne({ _id: categoryId });
      if (!category) {
        return res.status(404).send({
          message: "Category not found with id " + categoryId,
        });
      }

      const newItem = {
        title,
        price,
        country,
        city,
        description,
        categoryId,
      };
      const item = await Item.create(newItem);

      category.itemId.push({ _id: item._id });
      await category.save();

      res.status(200).send(item);
    } catch (err) {
      // error category Id
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Category not found with id " + err.value,
        });
      }

      // error bad request => butuh di kelola
      if (err.errors) {
        return res.status(400).send({
          error: err.errors,
        });
      }

      res.status(500).send({
        message: err.message || "Some error occurred while creating the Item.",
      });
    }
  },

  itemUpdate: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, price, country, city, description, categoryId } = req.body;

      // check category
      const category = await Category.findOne({ _id: categoryId });
      if (!category) {
        return res.status(404).send({
          message: "Category not found with id " + categoryId,
        });
      }

      const item = await Item.findOne({ _id: id });
      if (!item) {
        return res.status(404).send({
          message: "Item not found with id " + id,
        });
      }

      item.title = title;
      item.price = price;
      item.country = country;
      item.city = city;
      item.description = description;
      item.categoryId = categoryId;
      await item.save();

      res.status(200).send(item);
    } catch (err) {
      // error if itemId or categoryId is null
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Item or Category not found",
        });
      }

      // error bad request => butuh di kelola
      if (err.errors) {
        return res.status(400).send({
          error: err.errors,
        });
      }

      res.status(500).send({
        message: err.message || "Some error occurred while updating the Item.",
      });
    }
  },

  itemDelete: async (req, res) => {
    try {
      const { id } = req.params;

      const item = await Item.findOne({ _id: id });
      if (!item) {
        return res.status(404).send({
          message: "Item not found with id " + id,
        });
      }

      await item.remove();

      res.send({ message: "item deleted successfully!" });
    } catch (err) {
      // error Item Id
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Item not found with id " + err.value,
        });
      }

      res.status(500).send({
        message: err.message || "Some error occurred while deleting the Item.",
      });
    }
  },
};
