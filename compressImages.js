import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const inputDir = path.join(__dirname, 'public')

const files = fs.readdirSync(inputDir).filter(f => 
  f.endsWith('.jpg') || f.endsWith('.png')
)

async function compress() {
  for (const file of files) {
    const filePath = path.join(inputDir, file)
    const tempPath = filePath + '.tmp'
    
    await sharp(filePath)
      .resize(500, 500, { fit: 'cover' })
      .jpeg({ quality: 75 })
      .toFile(tempPath)
    
    fs.renameSync(tempPath, filePath)
    console.log(`Compressed: ${file}`)
  }
  console.log('All images compressed!')
}

compress()