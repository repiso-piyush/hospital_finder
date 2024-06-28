/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Hospital` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Hospital" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "geom" DROP NOT NULL;
