const connection = require("../database/connection");

class Service {
  addService(service) {
    const query = `INSERT INTO services(client, pet, service, status, observations)
      VALUES($1, $2, $3, $4, $5)`
    const values = [
      service.client,
      service.pet,
      service.service,
      service.status,
      service.observations,
    ]

    console.log("posteando");
    connection.query(query, values, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log("success: ", result);
      }
    });
  };
};

module.exports = new Service;