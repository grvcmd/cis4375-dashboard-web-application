/*
This file will handle how the server responds to
endpoints related to the model

When an endpoint is used, it will use the given function inside the model controller
*/


module.exports = app => {
  const company_licenses = require("../controllers/company_license.controller.js");

  var router = require("express").Router();

  // Endpoint that will create a new company_license
  router.post("/create", company_licenses.create);

  // Endpoint that will retrieve all company_licenses
  router.get("/", company_licenses.findAll)

  // Endpoint that will get the company_license with the given l_id
  router.get("/:l_id", company_licenses.findOne);

  // Endpoint to get all company_licenses under the given loc_id
  router.get("/location/:loc_id", company_licenses.findCompanyLicenses)

  // Endpoint that will update the company_license with the given l_id
  router.put("/:l_id", company_licenses.update);

  // Endpoint that will delete the company_license with the l_id
  router.delete("/:l_id",company_licenses.delete);

  // Idk what this does? I think this uses the address of the api aka our db
  app.use('/api/company_licenses', router);
};