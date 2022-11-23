/*
This file will handle how the server responds to
endpoints related to the model

When an endpoint is used, it will use the given function inside the model controller
*/


module.exports = app => {
  const stakeholders = require("../controllers/stakeholder.controller.js");

  var router = require("express").Router();

  // Endpoint that will create a new stakeholder
  router.post("/create", stakeholders.create);

  // Endpoint that will retrieve all stakeholders
  router.get("/", stakeholders.findAll)

  // Endpoint to get all stakeholders under the provided c_id
  router.get("/company/:c_id", stakeholders.findStakeholders);

  // Endpoint that will get the stakeholder with the given s_id
  router.get("/:s_id", stakeholders.findOne);

  // Endpoint that will update the stakeholder with the given s_id
  router.put("/:s_id", stakeholders.update);

  // Endpoint that will delete the stakeholder with the s_id
  router.delete("/:s_id",stakeholders.delete);

  // Idk what this does? I think this uses the address of the api aka our db
  app.use('/api/stakeholders', router);
};