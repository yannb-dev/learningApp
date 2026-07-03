/*
  Warnings:

  - You are about to drop the column `practicalproject` on the `Module` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Module" DROP COLUMN "practicalproject";

-- CreateTable
CREATE TABLE "Practicalproject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stack" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "warning" TEXT NOT NULL,
    "numModule" INTEGER NOT NULL,
    "moduleId" TEXT NOT NULL,
    "stepHelp" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Practicalproject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Practicalproject_moduleId_key" ON "Practicalproject"("moduleId");

-- AddForeignKey
ALTER TABLE "Practicalproject" ADD CONSTRAINT "Practicalproject_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;
