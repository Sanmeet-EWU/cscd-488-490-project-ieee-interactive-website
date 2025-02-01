-- Creates event database
-- CREATE DATABASE IF NOT EXISTS EventsDB;
USE EventsDB;

-- Creates the main Events table (for upcoming events)
/*CREATE TABLE IF NOT EXISTS Events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(50) NOT NULL,
    location VARCHAR(500) NOT NULL,
    registration_url VARCHAR(500),
    banner_url VARCHAR(500)
);

-- Creates the PastEvents table (for old events)
CREATE TABLE IF NOT EXISTS PastEvents (
    id INT PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(50) NOT NULL,
    location VARCHAR(500) NOT NULL,
    registration_url VARCHAR(500),
    banner_url VARCHAR(500),
    moved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);*/

-- Enables automatic event scheduling
SET GLOBAL event_scheduler = ON;

-- Creates a scheduled event to move old events daily
DELIMITER //
CREATE EVENT IF NOT EXISTS MoveOldEvents
ON SCHEDULE EVERY 1 DAY
DO
BEGIN
    -- Moves old events to PastEvents
    INSERT INTO PastEvents (id, title, description, date, time, location, registration_url, banner_url)
    SELECT * FROM Events WHERE date < CURDATE();

    -- Deletes moved events from Events table
    DELETE FROM Events WHERE date < CURDATE();
END;
//
DELIMITER ;

-- Just to see if the database and tables are created and values are inserted
SELECT DATABASE();
SHOW TABLES;

set SQL_Safe_UPDATES = 0;
   
UPDATE Events 
SET id = id + 1 
ORDER BY id DESC;

-- Inserts an example event (optional)
INSERT INTO Events (id, title, description, date, time, location, registration_url, banner_url)
VALUES (
	1,
    'IEEE 2025 Rising Star',
    'Join us for an exciting evening of student presentations! STEM Students Welcome! Free Pizza provided.',
    '2025-01-30',
    '5:00 PM - 6:30 PM',
    'EWU Catalyst Building, 601 E Riverside Ave, Room CAT 304',
    'https://events.vtools.ieee.org/m/462092',
    'eventBanner.jpg'
);


-- This will delete an event once the id increment reaches that threshhold
	-- DELETE FROM Events WHERE id >= 4;

-- Just to test
DELETE FROM Events WHERE date < CURDATE() - INTERVAL 1 DAY;

-- What Cait wants
-- DELETE FROM Events WHERE date < CURDATE() - INTERVAL 5 YEAR;
  
set SQL_Safe_UPDATES = 1;

  