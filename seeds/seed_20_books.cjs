const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const userId = '20books'; // Replace with a valid user ID

  const books = Array.from({ length: 20 }).map((_, i) => ({
    title: `Book Title ${i + 1}`,
    author: `Author ${i + 1}`,
    publishYear: 2000 + (i % 21),
    price: (i + 1) * 10,
    available: i % 2 === 0,
    description: `Description for Book ${i + 1}`,
    userId,
  }));

  await prisma.book.createMany({ data: books });
  console.log('20 books created!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
