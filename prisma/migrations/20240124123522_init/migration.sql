/*
  Warnings:

  - You are about to drop the column `stripe` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `stripe_id` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Orders_user_id_key";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "stripe",
ADD COLUMN     "stripe_id" TEXT NOT NULL;
