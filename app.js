const express = require("express");
const { append } = require("express/lib/response");

const app = express();

//importing mongoose for mongodb
const mongoose = require("mongoose");

//importing cors value
const cors = require("cors");

//importing body parser to use json
const bodyParser = require("body-parser");

//importing values for config file
var PropertiesReader = require("properties-reader");
var properties = PropertiesReader("config/app.properties");

//importing route middleware
const routes = require("./routes/routes");

//importing login module
const logger = require("./logger");


//main class to run app
class Server {
  //constructr
  constructor() {
    this.initDB();
    this.initExpressMiddleware();
    this.initRoutes();
    this.start();
  }

  //method to start the pp
  start() {
    try {
      //listen on a port
      app.listen(properties.get("severPort"));
      logger.info(
        "Server listening at the port " + properties.get("severPort")
      );
    } catch (err) {
      //error handling
      logger.error(
        "Error listening at the port " + properties.get("severPort")
      );
    }
  }

  //method calling middlewares
  initExpressMiddleware() {
    //cors issue
    app.use(cors());
    app.use(bodyParser.json());
  }

  //method intializing routes
  initRoutes() {
    app.use("/", routes);
  }

  //method connecting to database
  initDB() {
    try {
      //coonect to DB
      mongoose.connect(
        properties.get("DATABASE_PATH"),
        {
          ignoreUndefined: true,
        },
        () => logger.info("Connected to Database")
      );
    } catch (err) {
      logger.error(err);
      logger.error("Error While Connecting to database");
    }
  }
}

new Server();