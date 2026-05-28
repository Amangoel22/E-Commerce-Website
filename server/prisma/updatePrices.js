require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const updates = [
    // Electronics
    { name: 'Wireless Headphones', price: 2499, originalPrice: 3499 },
    { name: 'USB-C Cable', price: 299, originalPrice: 499 },
    { name: 'Portable Charger', price: 1299, originalPrice: 1999 },
    { name: 'Desk Lamp', price: 899, originalPrice: 1499 },
    { name: 'Mechanical Keyboard', price: 3499, originalPrice: 5999 },
    { name: 'Wireless Mouse', price: 999, originalPrice: 1499 },
    { name: 'Monitor Stand', price: 1499, originalPrice: 2199 },
    { name: 'Phone Case', price: 399, originalPrice: 699 },

    // Clothing
    { name: 'Cotton T-Shirt', price: 499, originalPrice: 799 },
    { name: 'Denim Jeans', price: 1499, originalPrice: 2199 },
    { name: 'Casual Sweater', price: 1199, originalPrice: 1799 },
    { name: 'Wool Jacket', price: 2999, originalPrice: 4499 },
    { name: 'Summer Dress', price: 1299, originalPrice: 1999 },
    { name: 'Running Shoes', price: 2499, originalPrice: 3999 },
    { name: 'Socks Pack', price: 299, originalPrice: 499 },
    { name: 'Winter Hat', price: 599, originalPrice: 999 },

    // Food
    { name: 'Organic Coffee Beans', price: 499, originalPrice: 749 },
    { name: 'Green Tea Set', price: 399, originalPrice: 599 },
    { name: 'Olive Oil', price: 649, originalPrice: 999 },
    { name: 'Dark Chocolate', price: 199, originalPrice: 299 },
    { name: 'Almonds Pack', price: 349, originalPrice: 549 },
    { name: 'Honey Jar', price: 299, originalPrice: 449 },
    { name: 'Spice Collection', price: 799, originalPrice: 1199 },
    { name: 'Fresh Herbs Pack', price: 149, originalPrice: 249 },

    // Home
    { name: 'Throw Pillow', price: 799, originalPrice: 1299 },
    { name: 'Area Rug', price: 2499, originalPrice: 3999 },
    { name: 'Wall Art Frame', price: 599, originalPrice: 999 },
    { name: 'Desk Organizer', price: 699, originalPrice: 1099 },
    { name: 'Table Lamp', price: 1299, originalPrice: 1999 },
    { name: 'Storage Shelves', price: 2999, originalPrice: 4499 },
    { name: 'Door Mat', price: 399, originalPrice: 649 },
    { name: 'Plant Pot', price: 349, originalPrice: 549 },

    // Beauty
    { name: 'Face Moisturizer', price: 899, originalPrice: 1499 },
    { name: 'Lip Balm', price: 199, originalPrice: 349 },
    { name: 'Body Lotion', price: 499, originalPrice: 799 },
    { name: 'Facial Serum', price: 1299, originalPrice: 1999 },
    { name: 'Makeup Brush Set', price: 799, originalPrice: 1299 },
    { name: 'Hair Mask', price: 449, originalPrice: 749 },
    { name: 'Sunscreen SPF50', price: 599, originalPrice: 899 },
    { name: 'Eye Cream', price: 899, originalPrice: 1399 },

    // Books
    { name: 'Fiction Novel', price: 299, originalPrice: 499 },
    { name: 'Science Book', price: 499, originalPrice: 799 },
    { name: 'Self-Help Guide', price: 349, originalPrice: 549 },
    { name: 'Cookbook', price: 599, originalPrice: 999 },
    { name: 'Travel Guide', price: 449, originalPrice: 699 },
    { name: 'History Book', price: 549, originalPrice: 849 },
    { name: 'Poetry Collection', price: 249, originalPrice: 399 },
    { name: 'Comic Book', price: 199, originalPrice: 349 },
  ]

  for (const item of updates) {
    await prisma.product.updateMany({
      where: { name: item.name },
      data: {
        price: item.price,
        originalPrice: item.originalPrice,
        discount: Math.round((1 - item.price / item.originalPrice) * 100)
      }
    })
    console.log(`Updated: ${item.name} → ₹${item.price}`)
  }

  console.log('All prices updated!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())