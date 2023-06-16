CREATE DATABASE userInfo;
use userInfo;
-- Create the Users table
CREATE TABLE Users (
  user_id INT PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

SELECT * FROM Users;

-- Create the Posts table
CREATE TABLE Posts (
  post_id INT PRIMARY KEY,
  title VARCHAR(255),
  content VARCHAR(255),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


-- Create the Comments table
CREATE TABLE Comments (
  comment_id INT PRIMARY KEY,
  content VARCHAR(255),
  user_id INT,
  post_id INT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);
