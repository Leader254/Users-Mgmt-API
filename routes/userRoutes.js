import express from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
const app = express();

// Middleware
// app.use(bodyParser.json());

// Routes
// User Routes
app.post("/user", createUser);
app.get("/user/:id", getUser);
app.put("/user/:id", updateUser);
app.delete("/user/:id", deleteUser);

export default app;
