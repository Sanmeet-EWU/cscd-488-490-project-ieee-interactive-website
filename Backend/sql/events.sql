DROP TABLE IF EXISTS `events`;

CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `event_date` date NOT NULL,
  `event_time` time NOT NULL,
  `description` text NOT NULL,
  `banner` varchar(500) NOT NULL,
  `location` varchar(255) NOT NULL,
  `link` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

SET GLOBAL event_scheduler = ON;

-- Just to test
/*set SQL_Safe_UPDATES = 0;
DELETE FROM Events WHERE event_date < CURDATE() - INTERVAL 1 DAY;
set SQL_Safe_UPDATES = 1;
-- What Cait wants
-- DELETE FROM Events WHERE event_date < CURDATE() - INTERVAL 5 YEAR;

INSERT INTO Events (title, event_date, event_time, description, banner, location, link)
VALUES (
	'Tech Talk: Future of AI', 
    '2025-02-15', 
    '14:00:00', 
    'Join us for an insightful discussion on the future of artificial intelligence with industry experts.',
    'ai-event-banner.jpg', 
    'IEEE Conference Hall, University Campus', 
    'https://ieee.org/tech-talk-ai'
);*/