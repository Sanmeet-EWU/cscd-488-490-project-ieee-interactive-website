-- Create event database
CREATE DATABASE IF NOT EXISTS EventsDB;
USE EventsDB;

-- Create the main Events table (for upcoming events)
CREATE TABLE IF NOT EXISTS Events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    registration_url VARCHAR(255),
    banner_url VARCHAR(255)
);

-- Create the PastEvents table (for old events)
CREATE TABLE IF NOT EXISTS PastEvents (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    registration_url VARCHAR(255),
    banner_url VARCHAR(255),
    moved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable automatic event scheduling
SET GLOBAL event_scheduler = ON;

-- Create a scheduled event to move old events daily
DELIMITER //
CREATE EVENT IF NOT EXISTS MoveOldEvents
ON SCHEDULE EVERY 1 DAY
DO
BEGIN
    -- Move old events to PastEvents
    INSERT INTO PastEvents (id, title, description, date, time, location, type, registration_url, banner_url)
    SELECT * FROM Events WHERE date < CURDATE();

    -- Delete moved events from Events table
    DELETE FROM Events WHERE date < CURDATE();
END;
//
DELIMITER ;

-- Just to see if the database and tables are created and values are inserted
SELECT DATABASE();
SHOW TABLES;

/*-- Insert an example event (optional)
INSERT INTO Events (title, description, date, time, location, type, registration_url, banner_url)
VALUES (
    'Student Presentations: Rising Stars 2025',
    'Join us for an exciting evening of student presentations! STEM Students Welcome! Free Pizza provided.',
    '2025-01-30',
    '5:00 PM - 6:30 PM',
    'EWU Catalyst Building, 601 E Riverside Ave, Room CAT 304',
    'Student Event',
    'https://events.vtools.ieee.org/m/462092',
    'eventBanner.jpg'
);*/
