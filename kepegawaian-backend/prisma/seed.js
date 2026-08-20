const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");

async function main() {
  // Hashing password dengan bcryptjs
  const hashedPassword = await bcrypt.hash("passwordsuperadmin", 10); // '10' adalah salt rounds

  // Data user yang akan di-seed
  const userData = [
    {
      email: "superadmin@gmail.com",
      username: "superadmin1234",
      // Simpan password yang sudah di-hash
      password: hashedPassword,
      role: "Superadmin",
    },
  ];

  // Tambahkan data user ke database
  await prisma.user.createMany({
    data: userData,
    skipDuplicates: true,
  });
}

main()
  .then(() => {
    console.log("Seeding selesai ✅");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
