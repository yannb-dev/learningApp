/*
  Warnings:

  - Added the required column `moduleRef` to the `Criteria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ModuleRef` to the `Objective` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Criteria" ADD COLUMN     "moduleRef" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Objective" ADD COLUMN     "ModuleRef" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Roadmap" ALTER COLUMN "echeance" SET DATA TYPE TEXT;
