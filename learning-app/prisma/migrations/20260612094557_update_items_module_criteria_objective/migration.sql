/*
  Warnings:

  - You are about to drop the `Undermodule` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `index` to the `Criteria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numModule` to the `Module` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `duration` on the `Module` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `index` to the `Objective` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `dispo` on the `Roadmap` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Objective" DROP CONSTRAINT "Objective_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "Undermodule" DROP CONSTRAINT "Undermodule_moduleId_fkey";

-- AlterTable
ALTER TABLE "Criteria" ADD COLUMN     "index" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "numModule" INTEGER NOT NULL,
DROP COLUMN "duration",
ADD COLUMN     "duration" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Objective" ADD COLUMN     "index" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Roadmap" DROP COLUMN "dispo",
ADD COLUMN     "dispo" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Undermodule";

-- AddForeignKey
ALTER TABLE "Objective" ADD CONSTRAINT "Objective_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;
