/*
  Warnings:

  - You are about to drop the column `practicalProjectInProgress` on the `Roadmap` table. All the data in the column will be lost.
  - Added the required column `roadmapId` to the `Practicalproject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `practicalProjectInProgressId` to the `Roadmap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Practicalproject" ADD COLUMN     "roadmapId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Roadmap" DROP COLUMN "practicalProjectInProgress",
ADD COLUMN     "practicalProjectInProgressId" INTEGER NOT NULL;
