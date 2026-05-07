// Oq fonni shaffofga aylantiruvchi script
// PNG raw bytes orqali ishlaydi - hech qanday kutubxona kerak emas!
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

const inputPath = path.join(__dirname, 'app', 'public', 'images', 'plane_uzb.png');
const outputPath = path.join(__dirname, 'app', 'public', 'images', 'plane_uzb.png');

async function removeBg() {
  try {
    const img = await loadImage(inputPath);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;
    const tolerance = 40;
    const w = img.width;
    const h = img.height;
    
    // Flood fill from corners
    const visited = new Uint8Array(w * h);
    const queue = [];
    [[0,0],[w-1,0],[0,h-1],[w-1,h-1]].forEach(([x,y]) => {
      queue.push(y * w + x);
      visited[y * w + x] = 1;
    });
    
    while (queue.length > 0) {
      const idx = queue.pop();
      const px = idx % w;
      const py = Math.floor(idx / w);
      const pos = idx * 4;
      const r = data[pos], g = data[pos+1], b = data[pos+2];
      
      if (r > 255 - tolerance && g > 255 - tolerance && b > 255 - tolerance) {
        data[pos + 3] = 0;
        [[px-1,py],[px+1,py],[px,py-1],[px,py+1]].forEach(([nx,ny]) => {
          if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
            const nidx = ny * w + nx;
            if (!visited[nidx]) { visited[nidx] = 1; queue.push(nidx); }
          }
        });
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log(`✅ Tayyor! Rasm saqlandi: ${outputPath}`);
    console.log(`📐 O'lcham: ${img.width}x${img.height}`);
  } catch(e) {
    console.error('❌ Xato:', e.message);
  }
}

removeBg();
