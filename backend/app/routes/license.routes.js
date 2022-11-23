// /*
// This file will handle how the server responds to
// endpoints related to the model

// When an endpoint is used, it will use the given function inside the model controller
// */


// module.exports = app => {
//     const licenses = require("../controllers/license.controller.js");
  
//     var router = require("express").Router();
  
//     // Endpoint that will create a new license
//     router.post("/create", licenses.create);
  
//     // Endpoint that will retrieve all licenses
//     router.get("/allLicenses", licenses.findAll);
  
//     // Endpoint that will retrieve a single license with the given id
//     router.get("/:l_id", licenses.findOne);
  
//     // Endpoint that will update a license with the given id
//     router.put("/:l_id", licenses.update);
  
//     // Endpoint that will delete a license with the given id
//     router.delete("/:l_id", licenses.delete);
  
//     // localhost/api/license path.
//     app.use('/api/license', router);
//   };