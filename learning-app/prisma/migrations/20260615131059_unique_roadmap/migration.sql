/*
  Warnings:

  - A unique constraint covering the columns `[projectId]` on the table `Roadmap` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Roadmap_projectId_key" ON "Roadmap"("projectId");
