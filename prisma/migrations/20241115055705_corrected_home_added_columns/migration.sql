-- DropForeignKey
ALTER TABLE "Home" DROP CONSTRAINT "Home_userId_fkey";

-- AlterTable
ALTER TABLE "Home" ADD COLUMN     "addedDescription" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "addedLocation" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "_HomeToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HomeToUser_AB_unique" ON "_HomeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_HomeToUser_B_index" ON "_HomeToUser"("B");

-- AddForeignKey
ALTER TABLE "_HomeToUser" ADD CONSTRAINT "_HomeToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Home"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HomeToUser" ADD CONSTRAINT "_HomeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
