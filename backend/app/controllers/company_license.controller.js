// These are Sequelize created CRUD functions that will be used
// for the following model

const cryto = require('crypto'); // for self-generating UUID
const db = require("../models");
const Company_License = db.company_licenses;
const Op = db.Sequelize.Op;

// Create and Save a new Company_License
exports.create = (req, res) => {
  // Create a Company_License object to store the information
  const company_license = {
    l_id: cryto.randomBytes(16).toString('hex'),
    loc_id: req.body.loc_id,
    license_status: req.body.license_status,
    license_status_date: req.body.license_status_date,
    license_name: req.body.license_name,
    license_cost: req.body.license_cost,
    // license_expire_date: req.body.license_expire_date,
  };

  // Save the created Company to the DB
  Company_License.create(company_license)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while creating this company_license."
      });
    });
};

// Get all company_licenses or filter by license_status
exports.findAll = (req, res) => {
  const license_status = req.query.license_status;
  var condition = license_status ? { license_status: { [Op.like]: `%${license_status}%` } } : null;

  Company_License.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while retrieving company_licenses."
      });
    });
};

// Get licenses(license_name, license_cost) and company_licenses(license_status) by loc_id

// Get all company_licenses under a loc_id
exports.findCompanyLicenses = (req, res) => {
  Company_License.findAll({ where: {loc_id: req.params.loc_id} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || `An error occured while retrieving the company_licenses for loc_id: ${req.params.company_licenses}.`
      });
    });
};

// Find a single Company_License with l_id
exports.findOne = (req, res) => {
  const l_id = req.params.l_id;

  Company_License.findByPk(l_id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Company_License with l_id: ${l_id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || `Error retrieving Company_License with l_id ` + l_id
      });
    });
};

// Update a Company_License by the l_id in the request
exports.update = (req, res) => {
  const l_id = req.params.l_id;

  Company_License.update(req.body, {
    where: { l_id: l_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Company_License was successfully updated."
        });
      } else {
        res.send({
          message: `Can't update Company_License with l_id: ${l_id}. Maybe Company_License was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error updating Company_License with l_id: " + l_id
      });
    });
};

// Delete a Company_License with the specified l_id in the request
exports.delete = (req, res) => {
  const l_id = req.params.l_id;

  Company_License.destroy({
    where: { l_id: l_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Company_License was deleted successfully!"
        });
      } else {
        res.send({
          message: `Can't delete Company_License with l_id ${l_id}. Maybe Company_License was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Could not delete Company_License with l_id " + l_id
      });
    });
};


/*
This controller can be modified to return a pagination response
See https://bezkoder.com/node-js-sequelize-pagination-mysql/
*/