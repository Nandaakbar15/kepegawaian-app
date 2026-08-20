/*
  Warnings:

  - You are about to alter the column `status` on the `leave_requests` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.

*/
-- AlterTable
ALTER TABLE `leave_requests` MODIFY `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE `EmployeeDocuments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` INTEGER NOT NULL,
    `type` ENUM('KTP', 'Ijazah', 'Kontrak_kerja', 'NPWP') NOT NULL,
    `file_path` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EmployeeDocuments` ADD CONSTRAINT `EmployeeDocuments_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `Employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
