/*
  Warnings:

  - You are about to drop the column `blocId` on the `Objective` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Objective` table. All the data in the column will be lost.
  - You are about to drop the `Bloc` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `moduleId` to the `Objective` table without a default value. This is not possible if the table is not empty.
  - Added the required column `constraint` to the `Roadmap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dispo` to the `Roadmap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `echeance` to the `Roadmap` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bloc" DROP CONSTRAINT "Bloc_roadmapId_fkey";

-- DropForeignKey
ALTER TABLE "Bloc" DROP CONSTRAINT "Bloc_userId_fkey";

-- DropForeignKey
ALTER TABLE "Objective" DROP CONSTRAINT "Objective_blocId_fkey";

-- DropForeignKey
ALTER TABLE "Objective" DROP CONSTRAINT "Objective_userId_fkey";

-- AlterTable
ALTER TABLE "Objective" DROP COLUMN "blocId",
DROP COLUMN "userId",
ADD COLUMN     "moduleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Roadmap" ADD COLUMN     "constraint" TEXT NOT NULL,
ADD COLUMN     "dispo" TEXT NOT NULL,
ADD COLUMN     "echeance" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Bloc";

-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "prerequisites" TEXT NOT NULL,
    "pointcritical" TEXT NOT NULL,
    "praticalproject" TEXT NOT NULL,
    "roadmapId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Undermodule" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Undermodule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Criteria" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Criteria_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES "Roadmap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Undermodule" ADD CONSTRAINT "Undermodule_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Criteria" ADD CONSTRAINT "Criteria_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Objective" ADD CONSTRAINT "Objective_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Undermodule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
