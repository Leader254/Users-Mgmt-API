import sql from 'mssql'
import config from '../db/config.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// create a new user, post or comment
export const createUser = async (req, res) => {
    const { user_id, username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newPerson = req.body;

    // Check if all fields are provided and are valid:
    if (
        !newPerson.user_id &&
        !newPerson.username &&
        !newPerson.email &&
        !newPerson.password
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
    //   Check if user already exists:
    try {
      let pool = await sql.connect(config.sql);
      const result = await pool
        .request()
        .input("username", sql.VarChar, username)
        .input("email", sql.VarChar, email)
        .query(
          "SELECT * FROM Users WHERE username = @username OR email = @email"
        );
      const user = result.recordset[0];
      if (user) {
        res.status(409).json({ error: "User already exists" });
      } else {
        await pool
          .request()
          .input("user_id", sql.Int, user_id)
          .input("username", sql.VarChar, username)
          .input("email", sql.VarChar, email)
          .input("hashedpassword", sql.VarChar, hashedPassword)
          .query(
            "INSERT INTO Users (user_id, username, email, password) VALUES (@user_id, @username, @email, @hashedpassword)"
          );
        res.status(200).json({ message: "User Created Successfully" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occured while creating the user" });
    } finally {
      sql.close();
    }
  };

//   Delete user by id
  export const deleteUser = async (req, res) => {
    const id = req.params.id;
  
    try {
      const pool = await sql.connect(config.sql);
      const result = await pool
        .request()
        .input("id", sql.Int, id)
        .query("DELETE FROM Users WHERE user_id = @id");
  
      if (result.rowsAffected[0] === 1) {
        res.status(200).json({ message: "Person deleted successfully" });
      } else {
        res
          .status(500)
          .json({ message: "There was a problem deleting the person" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // Update a User
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const updatedPerson = req.body;
  
    try {
      const pool = await sql.connect(config.sql);
      const result = await pool
        .request()
        .input("id", sql.Int, id)
        .input("username", sql.VarChar, updatedPerson.username)
        .input("email", sql.VarChar, updatedPerson.email)
        .query(
          "UPDATE Users SET username = @username, email = @email WHERE user_id = @id"
        );
  
      if (result.rowsAffected[0] === 1) {
        res.status(200).json({ message: "Person updated successfully" });
      } else {
        res
          .status(500)
          .json({ message: "There was a problem updating the person" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // Get user by ID
export const getUser = async (req, res) => {
    const personId = req.params.id;
  
    try {
      const pool = await sql.connect(config.sql);
      const result = await pool
        .request()
        .input("id", personId)
        .query("SELECT * FROM Users WHERE user_id = @id");
  
      if (result.recordset.length > 0) {
        const person = result.recordset[0];
        res.json(person);
      } else {
        res.status(404).json({ message: "Person not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
