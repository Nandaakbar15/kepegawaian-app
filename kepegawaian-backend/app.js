require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const router = require("./routes/route");
const prisma = require("./lib/prisma");

// read the json data
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(cors());

// use router
app.use(router);

const server = app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\nShutting down gracefully...");
  await prisma.$disconnect();
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

process.on("SIGTERM", async () => {
  console.log("\nShutting down gracefully...");
  await prisma.$disconnect();
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
