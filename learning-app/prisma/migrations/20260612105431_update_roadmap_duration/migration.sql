/*
  Warnings:

  - Added the required column `duration` to the `Roadmap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Roadmap" ADD COLUMN     "duration" INTEGER NOT NULL;
