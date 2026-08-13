const { PrismaClient } = require("../generated/prisma/client");

// Inisialisasi PrismaClient tanpa adapter (menggunakan DATABASE_URL dari .env)
const prisma = new PrismaClient({
  log: ["error", "warn"],
});

module.exports = prisma;
