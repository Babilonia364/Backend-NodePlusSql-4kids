const moment = require("moment");
const connection = require("../database/connection");

class Service {
  addService(service, res) {
    const dateCreated = moment().format('YYYY-MM-DD HH:MM:SS');
    const date = moment(service.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

    const isValidDate = moment(date).isSameOrAfter(dateCreated);
    const isValidClient = service.client.length >= 5;

    const validations = [
      {
        name: 'date',
        valid: isValidDate,
        message: "Date must be equals or bigger than actual date",
      },
      {
        name: 'client',
        valid: isValidClient,
        message: "Client must contain at least five characters",
      },
    ]

    const errors = validations.filter(attribute => !attribute.valid);
    const existsErrors = errors.length;

    if (existsErrors) {
      return res.status(400).json(errors);
    }

    const query = `INSERT INTO services(client, pet, service, status, observations, date, date_created)
      VALUES($1, $2, $3, $4, $5, $6, $7)`
    const values = [
      service.client,
      service.pet,
      service.service,
      service.status,
      service.observations,
      dateCreated,
      date
    ]

    console.log("posteando");
    connection.query(query, values, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json(error);
      } else {
        res.status(201).json(result);
      }
    });
  };

  getAllServices(res) {
    const query = "SELECT * FROM services";

    connection.query(query, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(result.rows);
      }
    });
  };

  getServiceById(id, res) {
    const query = `SELECT * FROM services WHERE id=$1`;

    connection.query(query, [id], (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(result.rows);
      }
    });
  };

  editService(id, service, res) {
    if (service.date) {
      service.date = moment(service.date, "DD/MM/YYYY").format("YYYY-MM-DD HH:MM:SS");
    }
    const query = `UPDATE services SET client=$2, pet=$3, service=$4, status=$5, observations=$6, date=$7
      WHERE id=$1`;
    const values = [
      service.client,
      service.pet,
      service.service,
      service.status,
      service.observations,
      service.date,
    ]


    connection.query(query, [id, ...values], (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        service.id = id;
        res.status(200).json({ service });
      }
    });
  };

  deleteService(id, res) {
    const query = `DELETE FROM services WHERE id=$1`

    connection.query(query, [id], (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json(error);
      } else {
        res.status(200).json({id});
      }
    });
  };
};

module.exports = new Service;