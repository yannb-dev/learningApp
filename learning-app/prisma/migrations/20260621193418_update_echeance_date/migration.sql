/*
  Warnings:

  - Changed the type of `echeance` on the `Roadmap` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Roadmap" DROP COLUMN "echeance",
ADD COLUMN     "echeance" TIMESTAMP(3) NOT NULL;
