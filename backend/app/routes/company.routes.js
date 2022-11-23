/*
This file will handle how the server responds to
endpoints related to the model

When an endpoint is used, it will use the given function inside the model controller
*/


module.exports = app => {
  const companies = require("../controllers/company.controller.js");

  var router = require("express").Router();

  // Endpoint that will create a new company
  router.post("/create", companies.create);

  // Endpoint that will retrieve all companies
  router.get("/", companies.findAll)

  // Endpoint that will get the company with the given c_id
  router.get("/:c_id", companies.findOne);

  // Endpoint that will update the company with the given c_id
  router.put("/:c_id", companies.update);

  // Endpoint that will delete the company with the c_id
  router.delete("/:c_id",companies.delete);

  // Idk what this does? I think this uses the address of the api aka our db
  app.use('/api/companies', router);
};