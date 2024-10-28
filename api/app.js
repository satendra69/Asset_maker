var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
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
//var blogRoutes = require('./routes/blogs');
var cors = require("cors");
const db = require("./connect");

var app = express();

// Configure CORS
const corsOptions = {
  origin: ["http://142.93.213.221:8004", "http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

// Middleware
app.use(cors(corsOptions));
app.use(logger("dev")); // Logging middleware
app.use(express.json()); // Built-in middleware to parse JSON
app.use(express.urlencoded({ extended: false })); // Built-in middleware to parse URL-encoded bodies
app.use(cookieParser()); // Middleware to parse cookies

// Static serving of public folder
app.use(express.static(path.join(__dirname, "public")));

// Serve images from public/images
app.use("/api/images", express.static(path.join(__dirname, "public", "images")));

// View engine setup (if you're using it)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

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
app.use('/api/testimonials', testimonialRoutes);
//app.use('/api/blogs', blogRoutes);

// Root endpoint for testing
app.get("/api", function (req, res) {
  res.send("Hello");
});

// Consolidated error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.error(`${req.method} request for '${req.url}': ${err.message}`); // Log errors

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
