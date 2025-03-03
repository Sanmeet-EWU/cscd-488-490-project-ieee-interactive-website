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

CREATE EVENT delete_old_events
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_TIMESTAMP
DO
DELETE FROM events WHERE event_date < CURDATE() - INTERVAL 1 DAY;

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

SET GLOBAL event_scheduler = ON;

/*CREATE EVENT delete_old_events
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_TIMESTAMP
DO
DELETE FROM events WHERE event_date < CURDATE() - INTERVAL 1 DAY;
*/

-- What Cait wants
-- DELETE FROM events WHERE event_date < CURDATE() - INTERVAL 5 YEAR;
