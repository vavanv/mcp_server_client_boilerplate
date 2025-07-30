import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting to seed database with lastone.csv data...");

  // Read the CSV file
  const csvPath = path.join(__dirname, "lastone.csv");
  const csvContent = fs.readFileSync(csvPath, "utf-8");

  // Parse CSV (simple parsing)
  const lines = csvContent.split("\n").filter((line) => line.trim());
  const dataRows = lines.slice(1); // Skip header

  const companies = new Map<
    string,
    {
      description: string;
      chats: Set<string>;
      llms: Set<{ llm: string; specialization: string }>;
    }
  >();

  // Process each row
  for (const row of dataRows) {
    // Simple CSV parsing - split by comma and handle quoted fields
    const values: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current.trim()); // Add the last value

    if (values.length >= 5) {
      const companyName = values[0].replace(/"/g, "");
      const description = values[1].replace(/"/g, "");
      const chatbot = values[2].replace(/"/g, "");
      const llm = values[3].replace(/"/g, "");
      const specialization = values[4].replace(/"/g, "");

      if (!companies.has(companyName)) {
        companies.set(companyName, {
          description,
          chats: new Set(),
          llms: new Set(),
        });
      }

      const company = companies.get(companyName)!;

      // Add chatbot if not empty and not "None"
      if (chatbot && chatbot !== "None") {
        company.chats.add(chatbot);
      }

      // Add LLM if not empty
      if (llm) {
        company.llms.add({ llm, specialization });
      }
    }
  }

  console.log(`Found ${companies.size} unique companies`);

  // Clear existing data
  await prisma.llm.deleteMany();
  await prisma.chat.deleteMany();
  await prisma.company.deleteMany();

  // Create companies and their related data
  for (const [companyName, companyData] of companies) {
    console.log(`Processing company: ${companyName}`);

    // Create company
    const company = await prisma.company.create({
      data: {
        company: companyName,
        description: companyData.description,
      },
    });

    // Create chats
    for (const chatbot of companyData.chats) {
      await prisma.chat.create({
        data: {
          chatbot,
          companyId: company.id,
        },
      });
    }

    // Create LLMs
    for (const { llm, specialization } of companyData.llms) {
      await prisma.llm.create({
        data: {
          llm,
          specialization,
          companyId: company.id,
        },
      });
    }
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
