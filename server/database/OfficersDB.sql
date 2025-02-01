-- DO NOT RUN YET

CREATE DATABASE IF NOT EXISTS OfficersDB;
USE OfficersDB;

CREATE TABLE Officers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chapter_id INT, -- Links to the "Chapters Table"
    name VARCHAR(255) NOT NULL,
    title VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    icon_url VARCHAR(255),
    bio TEXT,
    FOREIGN KEY (chapter_id) REFERENCES chapters(id)
);

CREATE TABLE Officers_Social_Media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    officer_id INT,
    platform VARCHAR(100),
    url VARCHAR(255),
    FOREIGN KEY (officer_id) REFERENCES officers(id)
);

CREATE TABLE Former_Officers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chapter_id INT,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    icon_url VARCHAR(255),
    bio TEXT,
    date_ended DATE,
    FOREIGN KEY (chapter_id) REFERENCES chapters(id)
);


-- Copies the Officers details into Former_Officers
-- Then moves the Officer based on their id
INSERT INTO former_officers (chapter_id, name, title, email, icon_url, bio, date_ended)
SELECT chapter_id, name, title, email, icon_url, bio, CURDATE()
FROM officers
WHERE id = ?;

-- Deletes Officer from Officers table
DELETE FROM officers WHERE id = ?;

