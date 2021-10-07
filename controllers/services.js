const Services = require("../models/services");

module.exports = app => {
  app.get("/services", (req, res) => {
    Services.getAllServices(res);
  });

  app.post("/services", (req, res) => {
    const service = req.body;

    Services.addService(service, res);
  });

  app.get("/services/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Services.getServiceById(id, res);
  })

  app.put("/services/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const values = req.body;

    Services.editService(id, values, res);
  });

  app.delete("/services/:id", (req, res) => {
    const id = parseInt(req.params.id);
    
    Services.deleteService(id, res);
  });
};