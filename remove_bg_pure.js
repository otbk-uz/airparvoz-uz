// Faqat Node.js built-in modullar bilan PNG oq fonni olib tashlaymiz
// Hech qanday npm paket kerak emas!
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const inputPath = path.join(__dirname, 'app', 'public', 'images', 'plane_uzb.png');
const outputPath = path.join(__dirname, 'app', 'public', 'images', 'plane_uzb.png');

function readPNG(filePath) {
  const buf = fs.readFileSync(filePath);
  // PNG signature check
  if (buf.toString('hex', 0, 8) !== '89504e470d0a1a0a') {
    throw new Error('Bu PNG fayl emas! JPG boʻlsa, avval PNG ga aylantirib oling.');
  }
  
  let width, height, bitDepth, colorType;
  let idat = Buffer.alloc(0);
  let pos = 8;
  
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.slice(pos + 8, pos + 8 + len);
    
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === 'IDAT') {
      idat = Buffer.concat([idat, data]);
    }
    pos += 12 + len;
  }
  
  return { width, height, bitDepth, colorType, idat };
}

try {
  const { width, height, colorType, idat } = readPNG(inputPath);
  console.log(`📐 Rasm: ${width}x${height}, colorType: ${colorType}`);
  
  // Decompress
  const raw = zlib.inflateSync(idat);
  
  // Each row has a filter byte + row data
  const channels = colorType === 2 ? 3 : (colorType === 6 ? 4 : 3);
  const rowBytes = width * channels + 1;
  const pixels = Buffer.alloc(width * height * 4);
  
  // Reconstruct pixels (simplified - only filter type 0)
  for (let y = 0; y < height; y++) {
    const filter = raw[y * rowBytes];
    for (let x = 0; x < width; x++) {
      const srcOff = y * rowBytes + 1 + x * channels;
      const dstOff = (y * width + x) * 4;
      pixels[dstOff]     = raw[srcOff];         // R
      pixels[dstOff + 1] = raw[srcOff + 1];     // G
      pixels[dstOff + 2] = raw[srcOff + 2];     // B
      pixels[dstOff + 3] = channels === 4 ? raw[srcOff + 3] : 255; // A
    }
  }
  
  // Remove white background (flood fill from corners)
  const tolerance = 45;
  const visited = new Uint8Array(width * height);
  const queue = [[0,0],[width-1,0],[0,height-1],[width-1,height-1]];
  
  queue.forEach(([x, y]) => { visited[y * width + x] = 1; });
  let qi = 0;
  
  while (qi < queue.length) {
    const [px, py] = queue[qi++];
    const off = (py * width + px) * 4;
    const r = pixels[off], g = pixels[off+1], b = pixels[off+2];
    
    if (r > 255 - tolerance && g > 255 - tolerance && b > 255 - tolerance) {
      pixels[off + 3] = 0; // transparent!
      
      [[px-1,py],[px+1,py],[px,py-1],[px,py+1]].forEach(([nx,ny]) => {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const ni = ny * width + nx;
          if (!visited[ni]) { visited[ni] = 1; queue.push([nx, ny]); }
        }
      });
    }
  }
  
  // Write PNG with RGBA
  function crc32(buf) {
    let crc = 0xFFFFFFFF;
    for (const b of buf) {
      crc ^= b;
      for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }
  
  function chunk(type, data) {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const t = Buffer.from(type);
    const crcBuf = Buffer.concat([t, data]);
    const c = Buffer.alloc(4); c.writeUInt32BE(crc32(crcBuf));
    return Buffer.concat([len, t, data, c]);
  }
  
  // Build raw RGBA rows (filter=0)
  const rawOut = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++) {
    rawOut[y * (width * 4 + 1)] = 0; // filter none
    for (let x = 0; x < width; x++) {
      const src = (y * width + x) * 4;
      const dst = y * (width * 4 + 1) + 1 + x * 4;
      rawOut[dst]     = pixels[src];
      rawOut[dst + 1] = pixels[src + 1];
      rawOut[dst + 2] = pixels[src + 2];
      rawOut[dst + 3] = pixels[src + 3];
    }
  }
  
  const compressed = zlib.deflateSync(rawOut, { level: 9 });
  
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0; ihdrData[11] = 0; ihdrData[12] = 0;
  
  const signature = Buffer.from('89504e470d0a1a0a', 'hex');
  const pngOut = Buffer.concat([
    signature,
    chunk('IHDR', ihdrData),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0))
  ]);
  
  fs.writeFileSync(outputPath, pngOut);
  console.log('✅ Tayyor! Rasm shaffof PNG sifatida saqlandi!');
  console.log(`📁 Manzil: ${outputPath}`);
  
} catch(e) {
  console.error('❌ Xato:', e.message);
  console.log('\n💡 Maslahat: Agar rasm JPG formatida bo\'lsa, avval uni PNG ga aylantiring.');
  console.log('Buning uchun: Windows Photos dasturida oching → Save as → PNG tanlang');
}
