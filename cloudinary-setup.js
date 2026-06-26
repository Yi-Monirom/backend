require('dotenv').config();

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const SAMPLE_IMAGE = 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=700&q=85';

async function main() {
  // 1. Upload the sample image
  console.log('Uploading sample image...');
  const uploadResult = await cloudinary.uploader.upload(SAMPLE_IMAGE, {
    public_id: 'onboarding-sample',
  });

  console.log(`\nUploaded!`);
  console.log(`Secure URL: ${uploadResult.secure_url}`);
  console.log(`Public ID: ${uploadResult.public_id}`);

  // 2. Get image details from the upload result
  const { width, height, format, bytes } = uploadResult;
  console.log(`\nImage Metadata:`);
  console.log(`  Width: ${width}px`);
  console.log(`  Height: ${height}px`);
  console.log(`  Format: ${format}`);
  console.log(`  Size: ${(bytes / 1024).toFixed(2)} KB`);

  // 3. Generate transformed URL
  // f_auto — automatically serves the best format (e.g. WebP for Chrome, JPEG for others)
  // q_auto — automatically adjusts quality for optimal visual quality vs file size
  const transformedUrl = cloudinary.url('onboarding-sample', {
    fetch_format: 'auto',
    quality: 'auto',
  });

  console.log(`\nDone! Click link below to see optimized version of the image. Check the size and the format.`);
  console.log(`Transformed URL: ${transformedUrl}`);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
