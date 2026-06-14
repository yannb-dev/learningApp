/*
  Warnings:

  - You are about to drop the column `praticalproject` on the `Module` table. All the data in the column will be lost.
  - Added the required column `practicalproject` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Module" DROP COLUMN "praticalproject",
ADD COLUMN     "practicalproject" TEXT NOT NULL;
