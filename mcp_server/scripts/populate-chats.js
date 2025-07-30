const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Starting to populate chats table...");

    // Read the CSV file
    const csvPath = path.join(__dirname, "../prisma/chats.csv");
    const csvContent = fs.readFileSync(csvPath, "utf-8");

    // Parse CSV
    const lines = csvContent.split("\n").filter((line) => line.trim());
    const dataLines = lines.slice(1); // Skip header

    console.log(`Found ${dataLines.length} chat records to insert`);

    // Clear existing chats data using raw SQL
    await prisma.$executeRaw`DELETE FROM chats`;
    console.log("Cleared existing chats data");

    // Insert chats data using raw SQL
    for (const line of dataLines) {
      const values = line.split(",").map((v) => v.trim().replace(/"/g, ""));
      if (values.length >= 4) {
        const [company, chatbotName, description, specialization] = values;

        await prisma.$executeRaw`
          INSERT INTO chats (id, company, "chatbotName", description, specialization, "createdAt", "updatedAt")
          VALUES (gen_random_uuid(), ${company}, ${chatbotName}, ${description}, ${specialization}, NOW(), NOW())
        `;
      }
    }

    // Verify the data was inserted
    const count = await prisma.$queryRaw`SELECT COUNT(*) as count FROM chats`;
    console.log(
      `Successfully populated chats table with ${count[0].count} records`
    );
  } catch (error) {
    console.error("Error populating chats:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {
    console.log("Chats table population completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Failed to populate chats table:", error);
    process.exit(1);
  });
