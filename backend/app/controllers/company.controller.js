// These are Sequelize created CRUD functions that will be used
// for the following model

const cryto = require('crypto'); // for self-generating UUID
const db = require("../models");
const Company = db.companies;
const Op = db.Sequelize.Op;

// Create and Save a new Company
exports.create = (req, res) => {
  // Validate request by making sure Company name isn't empty
  // if (!req.body.c_name) {
  //   res.status(400).send({
  //     message: "Company Name must be filled out!"
  //   });
  //   return;
  // }

  // Create a Company object to store the information
  const company = {
    c_id: cryto.randomBytes(16).toString('hex'),
    c_name: req.body.c_name,
    c_ein: req.body.c_ein,
  };

  // Save the created Company to the DB
  Company.create(company)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while creating this Company."
      });
    });
};

// Get all companies or find by c_name
exports.findAll = (req, res) => {
  const c_name = req.query.c_name;
  // if there's a Company name, that's the condition and Company names LIKE the one entered will be listed,
  //  if not then then all companies will be listed
  var condition = c_name ? { c_name: { [Op.like]: `%${c_name}%` } } : null;

  Company.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while retrieving companies."
      });
    });
};

// Find a single Company with c_id
exports.findOne = (req, res) => {
  const c_id = req.params.c_id;

  Company.findByPk(c_id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Company with Company id: ${c_id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || `Error retrieving Company with Company id ` + c_id
      });
    });
};

// Update a Company by the c_id in the request
exports.update = (req, res) => {
  const c_id = req.params.c_id;

  Company.update(req.body, {
    where: { c_id: c_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Company was successfully updated."
        });
      } else {
        res.send({
          message: `Can't update Company with Company id: ${c_id}. Maybe Company was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error updating Company with Company id: " + c_id
      });
    });
};

// Delete a Company with the specified c_id in the request
exports.delete = (req, res) => {
  const c_id = req.params.c_id;

  Company.destroy({
    where: { c_id: c_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Company was deleted successfully!"
        });
      } else {
        res.send({
          message: `Can't delete Company with id ${c_id}. Maybe Company was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Could not delete Company with id " + c_id
      });
    });
};


/*
This controller can be modified to return a pagination response
See https://bezkoder.com/node-js-sequelize-pagination-mysql/
*/