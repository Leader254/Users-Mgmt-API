import sql from "mssql";
import config from "../db/config.js";

// create a comment
export const createComment = async (req, res) => {
  const { comment_id, content, user_id, post_id } = req.body;
  const newComment = req.body;

  // Check if all fields are provided
  if (
    !newComment.comment_id &&
    !newComment.content &&
    !newComment.user_id &&
    !newComment.post_id
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("comment_id", sql.Int, comment_id)
      .input("content", sql.VarChar, content)
      .input("user_id", sql.Int, user_id)
      .input("post_id", sql.Int, post_id)
      .query(
        "INSERT INTO Comments (comment_id, content, user_id, post_id) VALUES (@comment_id, @content, @user_id, @post_id)"
      );
    res.status(200).json({ message: "Comment Created Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the comment" });
  } finally {
    sql.close();
  }
};

// get a comment
export const getComment = async (req, res) => {
  const id = req.params.id;
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Comments WHERE comment_id = @id");
    const comment = result.recordset[0];
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while getting the comment" });
  } finally {
    sql.close();
  }
};

// get all comments
export const getAllComments = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query("SELECT * FROM Comments");
    const comments = result.recordset;
    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while getting the comments" });
  } finally {
    sql.close();
  }
};

// update a comment
export const updateComment = async (req, res) => {
  const id = req.params.id;
  const { content, user_id, post_id } = req.body;
  const updatedComment = req.body;

  // Check if all fields are provided
  if (!content || !user_id || !post_id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("content", sql.VarChar, content)
      .input("user_id", sql.Int, user_id)
      .input("post_id", sql.Int, post_id)
      .query(
        "UPDATE Comments SET content = @content, user_id = @user_id, post_id = @post_id WHERE comment_id = @id"
      );
    res.status(200).json({ message: "Comment Updated Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the comment" });
  } finally {
    sql.close();
  }
};

// delete a comment
export const deleteComment = async (req, res) => {
  const id = req.params.id;

  try {
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Comments WHERE comment_id = @id");
    res.status(200).json({ message: "Comment Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the comment" });
  } finally {
    sql.close();
  }
};
