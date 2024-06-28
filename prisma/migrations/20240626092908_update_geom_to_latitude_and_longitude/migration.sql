/*
  Warnings:

  - You are about to drop the column `geom` on the `Hospital` table. All the data in the column will be lost.
  - Added the required column `lat` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `long` to the `Hospital` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hospital" DROP COLUMN "geom",
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "long" DOUBLE PRECISION NOT NULL;
