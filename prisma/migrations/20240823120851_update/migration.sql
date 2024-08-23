/*
  Warnings:

  - You are about to drop the column `booking_name` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `booking_phone` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `receipts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `note_booking` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `table_seat` to the `tables` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `payments` DROP FOREIGN KEY `payments_booking_id_fkey`;

-- DropForeignKey
ALTER TABLE `receipts` DROP FOREIGN KEY `receipts_payment_id_fkey`;

-- DropForeignKey
ALTER TABLE `receipts` DROP FOREIGN KEY `receipts_user_id_fkey`;

-- AlterTable
ALTER TABLE `bookings` DROP COLUMN `booking_name`,
    DROP COLUMN `booking_phone`,
    ADD COLUMN `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `note_booking` VARCHAR(100) NOT NULL,
    ADD COLUMN `status_booking` ENUM('WAIT', 'APPROVE', 'CANCEL', 'SUCCEED') NOT NULL DEFAULT 'WAIT',
    ADD COLUMN `updated_at` TIMESTAMP(0) NOT NULL;

-- AlterTable
ALTER TABLE `tables` ADD COLUMN `table_seat` INTEGER NOT NULL;

-- DropTable
DROP TABLE `payments`;

-- DropTable
DROP TABLE `receipts`;
