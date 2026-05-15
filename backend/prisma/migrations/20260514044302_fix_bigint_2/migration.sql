/*
  Warnings:

  - You are about to alter the column `total` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `price` on the `TransactionItem` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "total" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "TransactionItem" ALTER COLUMN "price" SET DATA TYPE INTEGER;
