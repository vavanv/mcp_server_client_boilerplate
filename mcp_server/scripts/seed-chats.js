const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function main() {
  try {
    // Read the CSV file
    const csvPath = path.join(__dirname, "../prisma/chats.csv");
    const csvContent = fs.readFileSync(csvPath, "utf-8");

    // Parse CSV
    const lines = csvContent.split("\n").filter((line) => line.trim());
    const dataLines = lines.slice(1); // Skip header

    // Clear existing chats data
    await prisma.chats.deleteMany();

    // Insert chats data
    for (const line of dataLines) {
      const values = line.split(",").map((v) => v.trim());
      if (values.length >= 4) {
        await prisma.chats.create({
          data: {
            company: values[0] || "",
            chatbotName: values[1] || "",
            description: values[2] || "",
            specialization: values[3] || "",
          },
        });
      }
    }

    console.log(`Seeded ${dataLines.length} chat records.`);
  } catch (error) {
    console.error("Error seeding chats:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
