/*
  Warnings:

  - Added the required column `noteInProgress` to the `Practicalproject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Practicalproject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `practicalProjectInProgress` to the `Roadmap` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatePracticalProject" AS ENUM ('NoStart', 'InProgress', 'ToEnd');

-- AlterTable
ALTER TABLE "Practicalproject" ADD COLUMN     "noteInProgress" TEXT NOT NULL,
ADD COLUMN     "state" "StatePracticalProject" NOT NULL;

-- AlterTable
ALTER TABLE "Roadmap" ADD COLUMN     "practicalProjectInProgress" INTEGER NOT NULL;
