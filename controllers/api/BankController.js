const Bank = require("../../models/Bank");

module.exports = {
  bankIndex: async (req, res) => {
    try {
      const bank = await Bank.find();

      res.status(200).json({ bank });
    } catch (error) {
      res.status(500).send({
        message: err.message || "Some error occurred while getting the Bank.",
      });
    }
  },

  bankDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const bank = await Bank.findOne({ _id: id });

      if (!bank) {
        return res.status(404).send({
          message: "Bank not found with id " + id,
        });
      }

      res.status(200).json({ bank });
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Bank not found with id " + err.value,
        });
      }

      return res.status(500).send({
        message: err.message || "Some error occurred while getting the Bank.",
      });
    }
  },

  bankCreate: async (req, res) => {
    try {
      const { nameBank, nomorRekening, name } = req.body;

      const data = await Bank.create({
        name,
        nameBank,
        nomorRekening,
      });

      res.status(200).send(data);
    } catch (err) {
      // error bad request => all
      if (err.errors) {
        return res.status(400).send({
          error: err.errors,
        });
      }

      res.status(500).send({
        message: err.message || "Some error occurred while creating the Bank.",
      });
    }
  },

  bankUpdate: async (req, res) => {
    try {
      const { id } = req.params;
      const { nameBank, nomorRekening, name } = req.body;

      const bank = await Bank.findOne({ _id: id });
      if (!bank) {
        return res.status(404).send({
          message: "Bank not found with id " + id,
        });
      }

      bank.nameBank = nameBank;
      bank.nomorRekening = nomorRekening;
      bank.name = name;
      await bank.save();

      res.status(200).send(bank);
    } catch (err) {
      // error bank Id
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Bank not found with id " + err.value,
        });
      }
      // error bad request => all
      if (err.errors) {
        return res.status(400).send({
          error: err.errors,
        });
      }

      return res.status(500).send({
        message: err.message || "Some error occurred while updating the Bank.",
      });
    }
  },

  bankDelete: async (req, res) => {
    try {
      const { id } = req.params;

      const bank = await Bank.findOne({ _id: id });
      if (!bank) {
        return res.status(404).send({
          message: "Bank not found with id " + id,
        });
      }

      await bank.remove();

      res.send({ message: "bank deleted successfully!" });
    } catch (err) {
      // error bank Id
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Bank not found with id " + err.value,
        });
      }

      return res.status(500).send({
        message: err.message || "Some error occurred while deleting the Bank.",
      });
    }
  },
};
