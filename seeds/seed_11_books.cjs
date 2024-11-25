const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function generateUniqueDescription() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

async function main() {
  const userId = '11-books'; // Replace with a valid user ID

  const books = Array.from({ length: 11 }).map((_, i) => ({
    title: `Book Title ${i + 1}`,
    author: `Author ${i + 1}`,
    publishYear: 2000 + (i % 21),
    price: (i + 1) * 10,
    available: i % 2 === 0,
    description: generateUniqueDescription(),
    userId,
  }));

  await prisma.book.createMany({ data: books });
  console.log('11 books created!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
