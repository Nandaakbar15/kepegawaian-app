-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(155) NOT NULL,
    `email` VARCHAR(155) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('Superadmin', 'Admin', 'Manager', 'Karyawan') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Departments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(100) NOT NULL,
    `name` VARCHAR(155) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Positions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(155) NOT NULL,
    `level` VARCHAR(191) NOT NULL,
    `departmentId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nip` VARCHAR(155) NOT NULL,
    `full_name` VARCHAR(155) NOT NULL,
    `nik` VARCHAR(155) NOT NULL,
    `jenis_kelamin` ENUM('Laki_laki', 'Perempuan') NOT NULL,
    `birth_place` VARCHAR(155) NOT NULL,
    `birth_Date` DATETIME(3) NOT NULL,
    `phone` VARCHAR(155) NOT NULL,
    `address` TEXT NOT NULL,
    `statusPernikahan` ENUM('Sudah_menikah', 'Belum_menikah', 'Cerai_mati') NOT NULL,
    `agama` VARCHAR(155) NOT NULL,
    `join_date` DATETIME(3) NOT NULL,
    `departmentId` INTEGER NOT NULL,
    `position_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Employees_nip_key`(`nip`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Positions` ADD CONSTRAINT `Positions_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Departments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employees` ADD CONSTRAINT `Employees_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Departments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employees` ADD CONSTRAINT `Employees_position_id_fkey` FOREIGN KEY (`position_id`) REFERENCES `Positions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
