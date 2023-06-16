import express from "express";

import {
    createPost,
    getPost,
    updatePost,
    deletePost,
  } from "../controllers/postsController.js";


  const app = express();

// Post Routes
app.post("/posts", createPost);
app.get("/posts/:id", getPost);
app.put("/posts/:id", updatePost);
app.delete("/posts/:id", deletePost);

export default app;