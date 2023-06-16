import express from "express";
import {
    createComment,
    getComment,
    updateComment,
    deleteComment,
  } from "../controllers/commentsController.js";

  const app = express();

  // Comment Routes
app.post("/comments", createComment);
app.get("/comments/:id", getComment);
app.put("/comments/:id", updateComment);
app.delete("/comments/:id", deleteComment);

export default app;