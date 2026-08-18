-- CreateTable
CREATE TABLE `LeaveTypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(155) NOT NULL,
    `quota_days` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaveBalances` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `remaining_quota` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EmployeesToLeaveTypes` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EmployeesToLeaveTypes_AB_unique`(`A`, `B`),
    INDEX `_EmployeesToLeaveTypes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LeaveBalances` ADD CONSTRAINT `LeaveBalances_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `Employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeesToLeaveTypes` ADD CONSTRAINT `_EmployeesToLeaveTypes_A_fkey` FOREIGN KEY (`A`) REFERENCES `Employees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeesToLeaveTypes` ADD CONSTRAINT `_EmployeesToLeaveTypes_B_fkey` FOREIGN KEY (`B`) REFERENCES `LeaveTypes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
