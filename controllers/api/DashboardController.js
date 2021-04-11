module.exports = {
  dashboardApi: (req, res) => {
    const message = "Welcome to api Staycation v1";
    res.status(200).json({ message });
  },
};
