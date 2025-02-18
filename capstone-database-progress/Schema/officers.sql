DROP TABLE IF EXISTS `officers`;

CREATE TABLE `officers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `chapter_group` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `is_former_officer` tinyint(1) NOT NULL,
  `social_media` JSON NOT NULL,  -- Added JSON column  `profile` text NOT NULL,
  `profile` text NOT NULL,
  `bio` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci