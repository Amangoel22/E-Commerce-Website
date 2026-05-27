require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const productName = 'Portable Charger' // change this to whatever you want to delete

  // find the product
  const product = await prisma.product.findFirst({
    where: { name: productName }
  })

  if (!product) {
    console.log('Product not found')
    return
  }

  // delete related records first
  await prisma.cartItem.deleteMany({ where: { productId: product.id } })
  await prisma.orderItem.deleteMany({ where: { productId: product.id } })
  await prisma.review.deleteMany({ where: { productId: product.id } })

  // now delete the product
  await prisma.product.delete({ where: { id: product.id } })

  console.log(`Deleted: ${productName}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())