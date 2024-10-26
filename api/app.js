var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var logger = require("morgan");
require("dotenv").config();
var listingsRouter = require("./routes/listings");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var cityRouter = require("./routes/city");
var messageRouter = require("./routes/message");
var categoriesRouter = require("./routes/categories");
var regionRoutes = require("./routes/regions");
var contactRoutes = require("./routes/contact");
var savedListRoutes = require("./routes/savedList");
var testimonialRoutes = require('./routes/testimonial');
var blogRoutes = require('./routes/blogs');
var cors = require("cors");
const db = require("./connect");

var app = express();
app.use(cookieParser());
app.use(bodyParser.json());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// static serving of public folder
app.use(express.static(path.join(__dirname, "public")));

// Configure CORS
const corsOptions = {
  origin: ["http://142.93.213.221:8004", "http://localhost:3000"], // Add your frontend URL here
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};


app.use(cors(corsOptions));
app.use("/api/images", express.static(path.join(__dirname, "public", "images")));

app.get("/api", function (req, res) {
  res.send("Hello");
});

// Routes
app.use("/api/list", listingsRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/city", cityRouter);
app.use("/api/message", messageRouter);
app.use("/api/categories", categoriesRouter);
app.use('/api/regions', regionRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/saved-list', savedListRoutes);
//app.use('/api/testimonials', testimonialRoutes);
app.use('/api/blogs', blogRoutes);

// Consolidated error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.log(`${req.method} request for '${req.url}': ${err.message}`);

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
});

// Start server
const PORT = 8000;

app.listen(PORT, async () => {
  console.log(`API server running at http://localhost:${PORT}`);

  try {
    await db.query("SELECT 1");
    console.log("Connected to MySQL database");
  } catch (err) {
    console.error("Error connecting to MySQL database:", err);
  }
});

module.exports = app;
