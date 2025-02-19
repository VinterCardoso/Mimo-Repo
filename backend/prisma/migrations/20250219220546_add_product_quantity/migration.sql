/*
  Warnings:

  - Added the required column `quantity` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `quantity` INTEGER NOT NULL;
