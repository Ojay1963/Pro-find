import fs from 'fs'
import path from 'path'

const distDir = path.resolve('dist')
const indexPath = path.join(distDir, 'index.html')
const notFoundPath = path.join(distDir, '404.html')

if (!fs.existsSync(indexPath)) {
  console.error('copy-404: dist/index.html not found. Run build first.')
  process.exit(1)
}

fs.copyFileSync(indexPath, notFoundPath)
console.log('copy-404: created dist/404.html')
