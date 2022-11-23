// These are Sequelize created CRUD functions that will be used
// for the following model
const cryto = require('crypto'); // for self-generating UUID
const db = require("../models");
const Location = db.locations;
const Op = db.Sequelize.Op;

// Create and Save a new Location
exports.create = (req, res) => {

  // Create a Location object to store the information
  const location = {
    c_id: req.body.c_id,
    loc_id: cryto.randomBytes(16).toString('hex'),
    first_date_op: req.body.first_date_op,
    purchase_price: req.body.purchase_price,
    purchase_date: req.body.purchase_date,
    lease_exp_date: req.body.lease_exp_date,
    rent: req.body.rent,
    property_owner_company: req.body.property_owner_company,
    property_owner_ein: req.body.property_owner_ein,
    c_address: req.body.c_address,
    c_mailAdress: req.body.c_mailAdress,
    c_city: req.body.c_city,
    c_county: req.body.c_county,
    c_email: req.body.c_email,
    c_locationName: req.body.c_locationName,
    c_phoneNumber: req.body.c_phoneNumber,
  };

  // Save the created Location to the DB
  Location.create(location)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while creating this Location."
      });
    });
};

// Get all Locations or filter by c_city
exports.findAll = (req, res) => {
  const c_city = req.query.c_city;
  // If there's a condition, data that are LIKE the condition will be retrieved,
  //  if not then then all data will be retrieved
  var condition = c_city ? { c_city: { [Op.like]: `%${c_city}%` } } : null;

  Location.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while retrieving locations."
      });
    });
};

// Get location of the specified c_id
exports.findLocations = (req, res) => {
  Location.findAll({ where: {c_id: req.params.c_id} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || `An error occured while retrieving the locations for company w/ c_id: ${req.params.c_id}.`
      });
    });
};

// Find a single Location with loc_id
exports.findOne = (req, res) => {
  const loc_id = req.params.loc_id;

  Location.findByPk(loc_id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Location with loc_id: ${loc_id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || `Error retrieving Location with loc_id ` + loc_id
      });
    });
};

// Update a Location by the loc_id in the request
exports.update = (req, res) => {
  const loc_id = req.params.loc_id;

  Location.update(req.body, {
    where: { loc_id: loc_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Location was successfully updated."
        });
      } else {
        res.send({
          message: `Can't update Location with loc_id: ${loc_id}. Maybe Location was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error updating Location with loc_id: " + loc_id
      });
    });
};

// Delete a Location with the specified loc_id in the request
exports.delete = (req, res) => {
  const loc_id = req.params.loc_id;

  Location.destroy({
    where: { loc_id: loc_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Location was deleted successfully!"
        });
      } else {
        res.send({
          message: `Can't delete Location with loc_id ${loc_id}. Maybe Location was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Could not delete Location with loc_id " + loc_id
      });
    });
};


/*
This controller can be modified to return a pagination response
See https://bezkoder.com/node-js-sequelize-pagination-mysql/
*/