ALTER TABLE `homes` MODIFY COLUMN `createdAt` datetime DEFAULT '2025-03-14 23:34:18.639';--> statement-breakpoint
ALTER TABLE `messages` MODIFY COLUMN `msgDateTime` datetime DEFAULT '2025-03-14 23:34:18.640';--> statement-breakpoint
ALTER TABLE `orders` MODIFY COLUMN `ordDate` datetime DEFAULT '2025-03-14 23:34:18.640';--> statement-breakpoint
ALTER TABLE `reservations` MODIFY COLUMN `startDate` datetime DEFAULT '2025-03-14 23:34:18.639';--> statement-breakpoint
ALTER TABLE `reservations` MODIFY COLUMN `endDate` datetime DEFAULT '2025-03-14 23:34:18.639';--> statement-breakpoint
ALTER TABLE `reservations` MODIFY COLUMN `createdAt` datetime DEFAULT '2025-03-14 23:34:18.639';--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `createdAt` datetime DEFAULT '2025-03-14 23:34:18.638';--> statement-breakpoint
ALTER TABLE `orders` ADD `ordNumber` varchar(255) DEFAULT '';