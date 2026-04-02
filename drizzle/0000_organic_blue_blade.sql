CREATE TABLE `currencies` (
	`id` varchar(255) NOT NULL,
	`currLocal` varchar(5) DEFAULT 'en-US',
	`CurrName` varchar(100) DEFAULT '',
	`currCode` varchar(3) DEFAULT '',
	CONSTRAINT `currencies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`homeId` varchar(255) NOT NULL,
	CONSTRAINT `favorites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `homes` (
	`id` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`guests` int DEFAULT 0,
	`bedrooms` int DEFAULT 0,
	`bathrooms` int DEFAULT 0,
	`country` varchar(5) DEFAULT '',
	`address` varchar(255) DEFAULT '',
	`photo` text DEFAULT (''),
	`price` float DEFAULT 0,
	`facilities` text DEFAULT (''),
	`category` varchar(50) DEFAULT '',
	`addedCategory` boolean DEFAULT false,
	`addedDescription` boolean DEFAULT false,
	`addedLocation` boolean DEFAULT false,
	`createdAt` datetime DEFAULT '2025-03-14 23:33:06.817',
	`deleted` boolean DEFAULT false,
	`enabled` boolean DEFAULT true,
	CONSTRAINT `homes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `logs` (
	`id` varchar(255) NOT NULL,
	`dateTimeStamp` datetime,
	`level` varchar(50) DEFAULT '',
	`component` varchar(100) DEFAULT '',
	`message` text DEFAULT (''),
	`category` varchar(100) DEFAULT '',
	`moreinfo` text DEFAULT (''),
	`stackdump` text DEFAULT (''),
	CONSTRAINT `logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` varchar(255) NOT NULL,
	`msgDateTime` datetime DEFAULT '2025-03-14 23:33:06.819',
	`msgFrom` varchar(40) DEFAULT '',
	`msgTo` varchar(40) DEFAULT '',
	`msgMessage` text DEFAULT (''),
	`msgAttachments` text DEFAULT (''),
	`msgSeen` boolean DEFAULT false,
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` varchar(255) NOT NULL,
	`ordDate` datetime DEFAULT '2025-03-14 23:33:06.819',
	`ordCustId` varchar(255) DEFAULT '',
	`ordAmount` float DEFAULT 0,
	`ordReservRef` varchar(255) DEFAULT '',
	`ordSuccessfulPayment` boolean DEFAULT false,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reservations` (
	`id` varchar(255) NOT NULL,
	`startDate` datetime DEFAULT '2025-03-14 23:33:06.818',
	`endDate` datetime DEFAULT '2025-03-14 23:33:06.818',
	`rate` float DEFAULT 0,
	`totalCharged` float DEFAULT 0,
	`guests` int DEFAULT 0,
	`resToken` varchar(40) DEFAULT '',
	`createdAt` datetime DEFAULT '2025-03-14 23:33:06.818',
	`userId` varchar(255) NOT NULL,
	`homeId` varchar(255) NOT NULL,
	`deleted` boolean DEFAULT false,
	`deleteDate` datetime,
	CONSTRAINT `reservations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`firstName` varchar(255) NOT NULL,
	`lastName` varchar(255) NOT NULL,
	`profileImage` varchar(255) NOT NULL,
	`userSettings` text DEFAULT (''),
	`createdAt` datetime DEFAULT '2025-03-14 23:33:06.816',
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
