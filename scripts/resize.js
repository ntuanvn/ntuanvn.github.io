// Usage: npm install && node scripts\resize.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const imagesDir = path.join(projectRoot, 'images');
const srcImage = path.join(imagesDir, 'coming.jpg');
const sizes = [480, 800, 1200, 1600];

(async () => {
  try {
    if (!fs.existsSync(srcImage)) {
      console.error('Source image not found:', srcImage);
      process.exit(1);
    }
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    for (const w of sizes) {
      const dst = path.join(imagesDir, `coming-${w}.jpg`);
      await sharp(srcImage)
        .resize({ width: w })
        .jpeg({ quality: 85, mozjpeg: true })
        .toFile(dst);
      console.log('Created', dst);
    }

    // Optional: create a small placeholder (very low quality) for progressive loading
    const placeholder = path.join(imagesDir, 'coming-placeholder.jpg');
    await sharp(srcImage)
      .resize({ width: 64 })
      .blur(1)
      .jpeg({ quality: 30 })
      .toFile(placeholder);
    console.log('Created', placeholder);

    console.log('All images created.');
  } catch (err) {
    console.error('Error creating images:', err);
    process.exit(1);
  }
})();