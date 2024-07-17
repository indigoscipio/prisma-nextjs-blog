import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const todos = [
  {
    content: "Finish documentation",
    isCompleted: false,
    isDeleted: false,
  },
  {
    content: "Prepare presentation",
    isCompleted: false,
    isDeleted: false,
  },
  {
    content: "Design Website",
    isCompleted: false,
    isDeleted: false,
  },
];

async function main() {
  for (const todo of todos) {
    await prisma.todo.create({
      data: {
        content: todo.content,
        isCompleted: todo.isCompleted,
        isDeleted: todo.isDeleted,
      },
    });
  }
  console.log("Seed data successfully inserted.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
