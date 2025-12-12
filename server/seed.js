import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.character.createMany({
    data: [
      { name: "Waldo", x: 43.2, y: 76.3 },
      { name: "Wizard", x: 65.7, y: 78.2 },
      { name: "Odlaw", x: 59.1, y: 95.2 },
      { name: "Wenda", x: 43.7, y: 60.6 },
    ],
  });
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
