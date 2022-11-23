// These are Sequelize created CRUD functions that will be used
// for the following model
const cryto = require('crypto'); // for self-generating UUID
const db = require("../models");
const Stakeholder = db.stakeholders;
const Op = db.Sequelize.Op;

// Create and Save a new Stakeholder
exports.create = (req, res) => {

  // Create a Stakeholder object to store the information
  const stakeholder = {
    c_id: req.body.c_id,
    s_id: cryto.randomBytes(16).toString('hex'),
    s_fname: req.body.s_fname,
    s_lname: req.body.s_lname,
    s_title: req.body.s_title,
    s_dob: req.body.s_dob,
    s_placeOfBirth: req.body.s_placeOfBirth,
    s_address: req.body.s_address,
    s_email: req.body.s_email,
    s_percent_ownership: req.body.s_percent_ownership,
    s_spouse_fname: req.body.s_spouse_fname,
    s_spouse_lname: req.body.s_spouse_lname,
    s_loan_invested: req.body.s_loan_invested,
    s_personalFundsInvested: req.body.s_personalFundsInvested,
  };

  // Save the created Stakeholder to the DB
  Stakeholder.create(stakeholder)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while creating this Stakeholder."
      });
    });
};

// Get all stakeholders  or find by s_email
exports.findAll = (req, res) => {
  const s_email = req.query.s_email;
  // If there's a condition, data that are LIKE the condition will be retrieved,
  //  if not then then all data will be retrieved
  var condition = s_email ? { s_email: { [Op.like]: `%${s_email}%` } } : null;

  Stakeholder.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while retrieving stakeholders."
      });
    });
};

// Get all Stakeholders under the specified c_id
exports.findStakeholders = (req, res) => {
  Stakeholder.findAll({ where: {c_id: req.params.c_id} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || `An error occured while retrieving the stakeholders for company w/ c_id: ${req.params.c_id}.`
      });
    });
};

// Find a single Stakeholder with s_id
exports.findOne = (req, res) => {
  const s_id = req.params.s_id;

  Stakeholder.findByPk(s_id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Stakeholder with Stakeholder id: ${s_id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || `Error retrieving Stakeholder with Stakeholder id ` + s_id
      });
    });
};

// Update a Stakeholder by the s_id in the request
exports.update = (req, res) => {
  const s_id = req.params.s_id;

  Stakeholder.update(req.body, {
    where: { s_id: s_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Stakeholder was successfully updated."
        });
      } else {
        res.send({
          message: `Can't update Stakeholder with Stakeholder id: ${s_id}. Maybe Stakeholder was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error updating Stakeholder with Stakeholder id: " + s_id
      });
    });
};

// Delete a Stakeholder with the specified s_id in the request
exports.delete = (req, res) => {
  const s_id = req.params.s_id;

  Stakeholder.destroy({
    where: { s_id: s_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Stakeholder was deleted successfully!"
        });
      } else {
        res.send({
          message: `Can't delete Stakeholder with id ${s_id}. Maybe Stakeholder was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Could not delete Stakeholder with id " + s_id
      });
    });
};


/*
This controller can be modified to return a pagination response
See https://bezkoder.com/node-js-sequelize-pagination-mysql/
*/