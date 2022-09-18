/*
  Warnings:

  - Made the column `categoryId` on table `tests` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teacherDisciplineId` on table `tests` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tests" ALTER COLUMN "categoryId" SET NOT NULL,
ALTER COLUMN "teacherDisciplineId" SET NOT NULL;
