import sql from "mssql";
import config from "../db/config.js";

// create a post

export const createPost = async (req, res) => {
  const { post_id, title, content, user_id } = req.body;
  const newPost = req.body;

  // Check if all fields are provided
  if (
    !newPost.post_id &&
    !newPost.title &&
    !newPost.content &&
    !newPost.user_id
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("post_id", sql.Int, post_id)
      .input("title", sql.VarChar, title)
      .input("content", sql.VarChar, content)
      .input("user_id", sql.Int, user_id)
      .query(
        "INSERT INTO Posts (post_id, title, content, user_id) VALUES (@post_id, @title, @content, @user_id)"
      );
    res.status(200).json({ message: "Post Created Successfully" });
  }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occured while creating the post" });
        }
        finally {
            sql.close();
        }
};

// delete a post

export const deletePost = async (req, res) => {
    const id = req.params.id;
    
    try {
        let pool = await sql.connect(config.sql);
        await pool
        .request()
        .input("id", sql.Int, id)
        .query("DELETE FROM Posts WHERE post_id = @id");
        res.status(200).json({ message: "Post Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occured while deleting the post" });
    } finally {
        sql.close();
    }
}

// get a post

export const getPost = async (req, res) => {
    const id = req.params.id;
    
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool
        .request()
        .input("id", sql.Int, id)
        .query("SELECT * FROM Posts WHERE post_id = @id");
        const post = result.recordset[0];
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occured while getting the post" });
    } finally {
        sql.close();
    }
}

// update a post

export const updatePost = async (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    const updatedPost = req.body;
    
    // Check if all fields are provided
    if (!updatedPost.title && !updatedPost.content) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        let pool = await sql.connect(config.sql);
        await pool
        .request()
        .input("id", sql.Int, id)
        .input("title", sql.VarChar, title)
        .input("content", sql.VarChar, content)
        .query("UPDATE Posts SET title = @title, content = @content WHERE post_id = @id");
        res.status(200).json({ message: "Post Updated Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occured while updating the post" });
    } finally {
        sql.close();
    }
}
