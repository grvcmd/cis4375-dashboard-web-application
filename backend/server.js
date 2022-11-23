//Imports
const express = require('express');
const cors = require('cors')
const app = express();
//Imports the database models
const db = require("./app/models")


var corsOptions = {
  // origin configures the Access-Control-Allow-Origin CORS header (https://expressjs.com/en/resources/middleware/cors.html#configuration-options)
  origin: "http://localhost:5173" // only requests from "http://localhost:8081" will be allowed
};


//Middleware
app.use(cors(corsOptions));

// parse requests of content-type -> application/json
app.use(express.json())

// parse requests of content-type -> application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple root route.
app.get('/', (req, res) => {
  res.json({message: "Hello World"})
})

// syncs all models with our connected db
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message)
  });

//Backend routes
require("./app/routes/stakeholder.routes")(app);
require("./app/routes/company.routes")(app);
// require("./app/routes/license.routes")(app);
require("./app/routes/location.routes")(app);
require("./app/routes/company_license.routes")(app);

//set port
const PORT = process.env.PORT || 8080; // w/e is in the environment variable PORT, or 8080 if there's nothing there


//listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
