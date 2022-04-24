/*
  Warnings:

  - You are about to drop the column `textsearch` on the `Book` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "textsearch_idx";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "textsearch";
