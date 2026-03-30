/*
  Warnings:

  - You are about to drop the column `ExpiresAt` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `Quantity` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `Unit` on the `Food` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Food" DROP COLUMN "ExpiresAt",
DROP COLUMN "Quantity",
DROP COLUMN "Unit",
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "unit" TEXT NOT NULL;
