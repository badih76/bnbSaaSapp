/*
  Warnings:

  - You are about to drop the column `addedCategory` on the `Home` table. All the data in the column will be lost.
  - You are about to drop the column `addedDescription` on the `Home` table. All the data in the column will be lost.
  - You are about to drop the column `addedLocation` on the `Home` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Home" DROP COLUMN "addedCategory",
DROP COLUMN "addedDescription",
DROP COLUMN "addedLocation",
ADD COLUMN     "category" INTEGER;
