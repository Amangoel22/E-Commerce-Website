const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const products = [
// Electronics
  {name: 'Wireless Headphones', category: 'electronics', price: 129.99, originalPrice: 179.99, discount: 28, description: 'Premium noise-cancelling with 30hr battery', rating: 4.5, images: '/products/electronics-headphones.jpg' },
  { name: 'USB-C Cable', category: 'electronics', price: 19.99, originalPrice: 29.99, discount: 33, description: '2m fast charging cable, 240W power', rating: 4.8, images: '/products/electronics-cable.jpg' },
  { name: 'Desk Lamp', category: 'electronics', price: 59.99, originalPrice: 89.99, discount: 33, description: 'LED eye-care lamp with touch control', rating: 4.4, images: '/products/electronics-cable.jpg' },
  { name: 'Mechanical Keyboard', category: 'electronics', price: 89.99, originalPrice: 149.99, discount: 40, description: 'RGB gaming keyboard with brown switches', rating: 4.7, images: '/products/electronics-cable.jpg' },
  { name: 'Wireless Mouse', category: 'electronics', price: 39.99, originalPrice: 59.99, discount: 33, description: 'Ergonomic design, 18 month battery life', rating: 4.5, images: '/products/electronics-cable.jpg' },
  { name: 'Monitor Stand', category: 'electronics', price: 44.99, originalPrice: 64.99, discount: 31, description: 'Adjustable height, supports up to 32"', rating: 4.3, images: '/products/electronics-cable.jpg' },
  { name: 'Phone Case', category: 'electronics', price: 24.99, originalPrice: 39.99, discount: 38, description: 'Shockproof military grade protection', rating: 4.6, images: '/products/electronics-cable.jpg' },

  // Clothing
  { name: 'Cotton T-Shirt', category: 'clothing', price: 24.99, originalPrice: 39.99, discount: 38, description: '100% organic cotton, comfortable fit', rating: 4.4, images: '/products/clothing-tshirt.jpg' },
  { name: 'Casual Sweater', category: 'clothing', price: 54.99, originalPrice: 79.99, discount: 31, description: 'Soft wool blend, perfect for fall', rating: 4.6, images: '/products/clothing-tshirt.jpg' },
  { name: 'Wool Jacket', category: 'clothing', price: 129.99, originalPrice: 189.99, discount: 32, description: 'Premium wool, water resistant', rating:4.7, images:'/products/clothing-tshirt.jpg' },
  { name:'Summer Dress', category:'clothing', price: 59.99,  originalPrice: 89.99, discount: 33,  description: 'Light and breathable fabric', rating:4.5, images:'/products/clothing-tshirt.jpg' },
  { name:'Running Shoes', category:'clothing', price: 99.99, originalPrice: 149.99, discount: 33, description: 'Cushioned sole, great support', rating:4.8, images:'/products/clothing-tshirt.jpg' },
  { name: 'Socks Pack', category: 'clothing', price: 14.99, originalPrice: 24.99, discount: 40, description: '10 pairs, breathable cotton', rating: 4.3, images: '/products/clothing-tshirt.jpg' },
  { name: 'Winter Hat', category: 'clothing', price: 29.99, originalPrice: 44.99, discount: 33, description: 'Warm fleece lining', rating: 4.4, images: '/products/clothing-tshirt.jpg' },

  // Food & Grocery
  {name: 'Organic Coffee Beans', category: 'food', price: 12.99, originalPrice: 18.99, discount: 32, description: '250g pure arabica beans', rating: 4.6, images: '/products/food-coffee.jpg' },
  {name: 'Green Tea Set', category: 'food', price: 19.99, originalPrice: 29.99, discount: 33, description: 'Premium blend, 20 bags', rating: 4.5, images: '/products/food-coffee.jpg' },
  { name: 'Olive Oil', category: 'food', price: 22.99, originalPrice: 34.99, discount: 34, description: '500ml extra virgin first cold press', rating: 4.7, images: '/products/food-coffee.jpg' },
  { name: 'Dark Chocolate', category: 'food', price: 9.99, originalPrice: 14.99, discount: 33, description: '85% cocoa, fair trade', rating: 4.8, images: '/products/food-coffee.jpg' },
  { name: 'Almonds Pack', category: 'food', price: 15.99, originalPrice: 24.99, discount: 36, description: '200g roasted, unsalted', rating: 4.5, images: '/products/food-coffee.jpg' },
  { name: 'Honey Jar', category: 'food', price: 11.99, originalPrice: 17.99, discount: 33, description: '500g pure wildflower honey', rating: 4.6, images: '/products/food-coffee.jpg' },
  { name: 'Spice Collection', category: 'food', price: 34.99, originalPrice: 54.99, discount: 36, description: '12 essential spices pack', rating: 4.4, images: '/products/food-coffee.jpg' },
  { name: 'Fresh Herbs Pack', category: 'food', price: 8.99, originalPrice: 13.99, discount: 36, description: 'Basil, oregano, thyme mix', rating: 4.3, images: '/products/food-coffee.jpg' },

  // Home & Living
  { name: 'Throw Pillow', category: 'home', price: 39.99, originalPrice: 59.99, discount: 33, description: 'Soft velvet, water resistant', rating: 4.5, images: '/products/clothing-tshirt.jpg' },
  { name: 'Area Rug', category: 'home', price: 79.99, originalPrice: 119.99, discount: 33, description: '120x180cm, wool blend', rating: 4.6, images: '/products/clothing-tshirt.jpg' },
  { name: 'Wall Art Frame', category: 'home', price: 24.99, originalPrice: 39.99, discount: 38, description: 'Wooden frame, 8x10 inches', rating: 4.4, images: '/products/clothing-tshirt.jpg' },
  { name: 'Desk Organizer', category: 'home', price: 29.99, originalPrice: 44.99, discount: 33, description: 'Multi-compartment storage', rating: 4.5, images: '/products/clothing-tshirt.jpg' },
  { name: 'Table Lamp', category: 'home', price: 44.99, originalPrice: 69.99, discount: 36, description: 'Modern design, dimmable', rating: 4.6, images: '/products/clothing-tshirt.jpg' },
  { name: 'Storage Shelves', category: 'home', price: 89.99, originalPrice: 139.99, discount: 36, description: '5-tier metal shelving unit', rating: 4.7, images: '/products/clothing-tshirt.jpg' },
  { name: 'Door Mat', category: 'home', price: 19.99, originalPrice: 29.99, discount: 33, description: 'Anti-slip, weather resistant', rating: 4.3, images: '/products/clothing-tshirt.jpg' },
  { name: 'Plant Pot', category: 'home', price: 14.99, originalPrice: 22.99, discount: 35, description: 'Ceramic with drainage hole', rating: 4.4, images: '/products/clothing-tshirt.jpg' },

  // Beauty
  { name: 'Face Moisturizer', category: 'beauty', price: 44.99, originalPrice: 69.99, discount: 36, description: '50ml hydrating cream', rating: 4.6, images: '/products/clothing-tshirt.jpg' },
  { name: 'Lip Balm', category: 'beauty', price: 8.99, originalPrice: 14.99, discount: 40, description: 'SPF 30, vanilla scent', rating: 4.5, images: '/products/clothing-tshirt.jpg' },
  { name: 'Body Lotion', category: 'beauty', price: 22.99, originalPrice: 34.99, discount: 34, description: '200ml lavender scent', rating: 4.5, images: '/products/clothing-tshirt.jpg' },
  { name: 'Facial Serum', category: 'beauty', price: 54.99, originalPrice: 84.99, discount: 35, description: 'Vitamin C, 30ml bottle', rating: 4.7, images: '/products/clothing-tshirt.jpg' },
  { name: 'Sunscreen SPF50', category: 'beauty', price: 26.99, originalPrice: 39.99, discount: 33, description: '75ml water resistant', rating: 4.8, images: '/products/clothing-tshirt.jpg' },
  { name: 'Eye Cream', category: 'beauty', price: 38.99, originalPrice: 59.99, discount: 35, description: '15ml anti-aging formula', rating: 4.6, images: '/products/clothing-tshirt.jpg' },
]

async function main() {
  console.log('Seeding products...')
  
  for (const product of products) {
    const { id, ...productData } = product
    await prisma.product.create({ 
      data: {
        ...productData,
        images: [productData.images],
        stock: 50
      }
    })
  }

  console.log(`${products.length} products seeded successfully`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })