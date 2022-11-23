/*
This file will handle how the server responds to
endpoints related to the model

When an endpoint is used, it will use the given function inside the model controller
*/


module.exports = app => {
  const locations = require("../controllers/location.controller.js");

  var router = require("express").Router();

  // Endpoint that will create a new location
  router.post("/create", locations.create);

  // Endpoint that will retrieve all locations
  router.get("/", locations.findAll)

  // Endpoint to get the location of the provided c_id
  router.get("/company/:c_id", locations.findLocations);

  // Endpoint that will get the location with the given loc_id
  router.get("/:loc_id", locations.findOne);

  // Endpoint that will update the location with the given loc_id
  router.put("/:loc_id", locations.update);

  // Endpoint that will delete the location with the loc_id
  router.delete("/:loc_id",locations.delete);

  // Idk what this does? I think this uses the address of the api aka our db
  app.use('/api/locations', router);
};