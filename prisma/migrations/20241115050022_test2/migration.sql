/*
  Warnings:

  - You are about to drop the column `category` on the `Home` table. All the data in the column will be lost.
  - You are about to drop the `_HomeToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_HomeToUser" DROP CONSTRAINT "_HomeToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_HomeToUser" DROP CONSTRAINT "_HomeToUser_B_fkey";

-- AlterTable
ALTER TABLE "Home" DROP COLUMN "category",
ADD COLUMN     "addedCategory" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "_HomeToUser";

-- AddForeignKey
ALTER TABLE "Home" ADD CONSTRAINT "Home_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
