const Services = require("../models/services");

module.exports = app => {
  app.get("/services", (req, res) => { res.send("Get test") });

  app.post("/services", (req, res) => {
    const service = req.body;

    Services.addService(service);
    res.send("Success registered");
  });
};