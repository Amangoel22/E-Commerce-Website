require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const categoryImages = {
  electronics: 'https://picsum.photos/seed/electronics/500/500',
  clothing: 'https://picsum.photos/seed/clothing/500/500',
  food: 'https://picsum.photos/seed/food/500/500',
  home: 'https://picsum.photos/seed/home/500/500',
  sports: 'https://picsum.photos/seed/sports/500/500',
  beauty: 'https://picsum.photos/seed/beauty/500/500',
  books: 'https://picsum.photos/seed/books/500/500',
}

async function main() {
  for (const [category, imageUrl] of Object.entries(categoryImages)) {
    await prisma.product.updateMany({
      where: { category },
      data: { images: [imageUrl] }
    })
    console.log(`Updated ${category}`)
  }
  console.log('All images updated!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())