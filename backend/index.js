//use express.js to create http routes
//run the development server using the .env file: node --env-file=.env ./index.js

import express from "express";
import path from "path";
import mongoose from "mongoose";
import categoryRouter from "./routes/categoryRoute.js";
import itemRouter from "./routes/itemRoute.js";
import userRouter from "./routes/userRoute.js";
import cors from "cors";
import defaultRoute from "./routes/defaultRoute.js";
import multer from "multer";

const app = express();

// .use(express.json()) is middleware that allows the server to parse incoming request with JSON data in the request.body and use that JSON data e.g. parsing a category object in a json format and creating that category object on the server side
app.use(express.json());

// Middleware for handling CORS policy
// Option 1: Allow all origins by default
// app.use(cors());

//Function to serve all static files inside the images directory
app.use("/images", express.static("images"));

// // Option 2: Allow custom origin
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//The default route of a server
app.get("/", defaultRoute);

//Router for the category model
app.use("/categories", categoryRouter);

//Router for the item model
app.use("/items", itemRouter);

//Router for the user model
app.use("/users", userRouter);

//serve content from the index.html file for requests that do not match a static file in the build folder
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  res.send("Upload Successful");
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log(`App connected to the database`);
    app.listen(process.env.PORT, () => {
      console.log(`port is: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
