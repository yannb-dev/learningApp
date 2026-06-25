/*
  Warnings:

  - You are about to drop the column `seanceId` on the `Memo` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `Memo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Memo" DROP CONSTRAINT "Memo_seanceId_fkey";

-- AlterTable
ALTER TABLE "Memo" DROP COLUMN "seanceId",
ADD COLUMN     "projectId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Memo" ADD CONSTRAINT "Memo_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
