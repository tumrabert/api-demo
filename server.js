const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
//Load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express VacQ API",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
//const swaggerDocs = swaggerJsDoc(swaggerOptions);

//Route files
const auth = require("./routes/auth");
const campground = require("./routes/campgrounds")
const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
//Rate Limiting
const limiter = rateLimit({
  windowsMs: 10 * 60 * 1000, //10 mins
  max: 500,
});
app.use(limiter);
//Prevent http param pollutions
app.use(hpp());
app.use(express.json());
//Set security headers
app.use(helmet());
//Sanitize data
app.use(mongoSanitize());
//Prevent XSS attacks
app.use(xss());
//Enable CORS
app.use(cors());
app.use("/api/v1/auth", auth);
app.use("/api/v1/campground", campground);
app.use(cookieParser);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log("Server running in", process.env.NODE_ENV, "mode on port", PORT)
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Close server & exit process
  server.close(() => process.exit(1));
});
