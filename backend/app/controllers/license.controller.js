// const db = require("../models");
// const License = db.licenses;
// const Op = db.Sequelize.Op;
// const cryto = require('crypto');

// // Create and Save a new license
// exports.create = (req, res) => {
//    // Validate request
//    if (!req.body.license_name) {
//     res.status(400).send({
//       message: "License name is missing!"
//     });
//     return;
//   }

//   // Create a license
//   const license = {
//     l_id : cryto.randomBytes(16).toString('hex'),
//     license_name: req.body.license_name,
//     license_cost: req.body.license_cost
//   };

//   // Save license in the database
//   License.create(license)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the license."
//       });
//     });
// };


// // Retrieve all licenses from the database.
// exports.findAll = async (req, res) => {
//     await License.findAll()
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving licenses."
//       });
//     });
// };

// // Find a single license with an id
// exports.findOne = (req, res) => {
//     const l_id = req.params.l_id;

//     License.findByPk(l_id)
//       .then(data => {
//         if (data) {
//           res.send(data);
//         } else {
//           res.status(404).send({
//             message: `Cannot find License with l_id=${l_id}.`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error retrieving license with id=" + l_id
//         });
//       });
// };

// // Update a license by the id in the request
// exports.update = (req, res) => {
//     const l_id = req.params.l_id;

//     License.update(req.body, {
//       where: { l_id: l_id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "License was updated successfully."
//           });
//         } else {
//           res.send({
//             message: `Cannot update license with l_id=${l_id}. Maybe l_id was not found or req.body is empty!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating license with l_id=" + l_id
//         });
//       });
// };

// // Delete a license with the specified id in the request
// exports.delete = (req, res) => {
//     const l_id = req.params.l_id;

//     License.destroy({
//       where: { l_id: l_id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "License was deleted successfully!"
//           });
//         } else {
//           res.send({
//             message: `Cannot delete License with l_id=${l_id}. Maybe license was not found!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Could not delete license with l_id=" + l_id
//         });
//       });
// };