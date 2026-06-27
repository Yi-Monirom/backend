import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CategoryService } from '../category/category.service';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { LookService } from '../look/look.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const categoryService = app.get(CategoryService);
  const productService = app.get(ProductService);
  const userService = app.get(UserService);

  console.log('Seeding database...');

  const existing = await categoryService.findAll();
  if (existing.length > 0) {
    console.log('Database already seeded, skipping.');
    await app.close();
    return;
  }

  const outerwear = await categoryService.create({
    name: 'Outerwear',
    imageUrl:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
  });
  const tops = await categoryService.create({
    name: 'Tops',
    imageUrl:
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
  });
  const bottoms = await categoryService.create({
    name: 'Bottoms',
    imageUrl:
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=600&q=80',
  });
  const dresses = await categoryService.create({
    name: 'Dresses',
    imageUrl:
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',
  });
  const accessories = await categoryService.create({
    name: 'Accessories',
    imageUrl:
      'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=600&q=80',
  });
  const footwear = await categoryService.create({
    name: 'Footwear',
    imageUrl:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80',
  });

  console.log('  ✓ Categories created');

  await productService.create({
    name: 'Architectural Merino Cardigan',
    description:
      '100% Responsibly Sourced Merino Wool. Structured yet soft, designed for effortless layering across seasons.',
    price: 490,
    imageUrl:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=700&q=85',
    categoryId: outerwear.id,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Noir', 'Ecru', 'Sienna'],
    fit: 'True to Size',
    isNew: true,
  });
  await productService.create({
    name: 'Tailored Wool Blazer',
    description:
      'Single-breasted blazer in Italian wool. Peak lapels, flap pockets, and a sculpted silhouette.',
    price: 685,
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=85',
    categoryId: outerwear.id,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Noir', 'Charcoal', 'Navy'],
    fit: 'True to Size',
    isNew: true,
  });
  await productService.create({
    name: 'Sculpted Trench Coat',
    description:
      'Reimagined trench in water-repellent cotton gabardine. Removable belt, raglan sleeves.',
    price: 890,
    imageUrl:
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=700&q=85',
    categoryId: outerwear.id,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Noir', 'Ecru'],
    fit: 'True to Size',
    isNew: false,
  });

  await productService.create({
    name: 'Merino Mock Neck',
    description:
      'Fine merino wool for effortless layering. Ribbed collar and cuffs with a clean, modern finish.',
    price: 175,
    imageUrl:
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=700&q=85',
    categoryId: tops.id,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Noir', 'Ecru', 'Burgundy', 'Sage'],
    fit: 'True to Size',
    isNew: true,
  });
  await productService.create({
    name: 'Linen Button-Down Shirt',
    description:
      'Relaxed-fit shirt in garment-washed linen. Mother-of-pearl buttons and a curved hem.',
    price: 220,
    imageUrl:
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=700&q=85',
    categoryId: tops.id,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Ecru', 'Sky'],
    fit: 'Runs Large',
    isNew: false,
  });
  await productService.create({
    name: 'Cashmere Turtleneck',
    description:
      'Two-ply cashmere with a relaxed silhouette. Ribbed trim and a soft hand feel.',
    price: 395,
    imageUrl:
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=700&q=85',
    categoryId: tops.id,
    sizes: ['S', 'M', 'L'],
    colors: ['Noir', 'Ecru', 'Camel'],
    fit: 'True to Size',
    isNew: true,
  });

  await productService.create({
    name: 'Wool Wide-Leg Trousers',
    description:
      'High-waisted trousers in virgin wool. Pleated front, side pockets, and a fluid drape.',
    price: 420,
    imageUrl:
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=700&q=85',
    categoryId: bottoms.id,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Noir', 'Charcoal', 'Navy'],
    fit: 'True to Size',
    isNew: false,
  });
  await productService.create({
    name: 'Slim Crop Pant',
    description:
      'Stretch cotton twill with a slim, cropped silhouette. Zip fly and slant pockets.',
    price: 260,
    imageUrl:
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=700&q=85',
    categoryId: bottoms.id,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Noir', 'Khaki', 'Olive'],
    fit: 'Runs Small',
    isNew: true,
  });

  await productService.create({
    name: 'Satin Slip Dress',
    description:
      ' bias-cut slip dress in satin-backed crepe. Adjustable spaghetti straps and a fluid hem.',
    price: 340,
    imageUrl:
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=700&q=85',
    categoryId: dresses.id,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Noir', 'Burgundy', 'Emerald'],
    fit: 'True to Size',
    isNew: false,
  });
  await productService.create({
    name: 'Knit Column Dress',
    description:
      'Body-skimming ribbed knit dress with a mock neck and long sleeves. Sculpts the silhouette.',
    price: 280,
    imageUrl:
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=700&q=85',
    categoryId: dresses.id,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Noir', 'Ecru', 'Sage'],
    fit: 'Runs Small',
    isNew: true,
  });

  await productService.create({
    name: 'Leather Crossbody Bag',
    description:
      'Italian calfskin leather with a adjustable strap. Gold-toned hardware and interior zip pocket.',
    price: 550,
    imageUrl:
      'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=700&q=85',
    categoryId: accessories.id,
    sizes: ['One Size'],
    colors: ['Noir', 'Tobacco', 'Burgundy'],
    fit: 'True to Size',
    isNew: true,
  });
  await productService.create({
    name: 'Silk Scarf',
    description:
      'Hand-rolled edges in 100% silk twill. Architectural print inspired by modernist geometry.',
    price: 180,
    imageUrl:
      'https://images.unsplash.com/photo-1601924996367-e45e3e2f2c7d?w=700&q=85',
    categoryId: accessories.id,
    sizes: ['One Size'],
    colors: ['Noir', 'Ecru', 'Sienna'],
    fit: 'True to Size',
    isNew: false,
  });

  await productService.create({
    name: 'Leather Chelsea Boot',
    description:
      'Polished calfskin with a elastic gusset and pull tab. Blake-stitched leather sole.',
    price: 620,
    imageUrl:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=700&q=85',
    categoryId: footwear.id,
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    colors: ['Noir', 'Tobacco'],
    fit: 'True to Size',
    isNew: true,
  });
  await productService.create({
    name: 'Leather Loafer',
    description:
      'Unlined suede loafer with a bit hardware and leather sole. Cushioned insole for all-day wear.',
    price: 480,
    imageUrl:
      'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=700&q=85',
    categoryId: footwear.id,
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    colors: ['Noir', 'Tobacco', 'Navy'],
    fit: 'Runs Large',
    isNew: false,
  });

  console.log('  ✓ Products created');

  // Seed looks
  const lookService = app.get(LookService);
  await lookService.create({ title: 'The Tailoring Archive', subtitle: 'VOL. 04', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80', tag: 'BLAZERS', height: 420 });
  await lookService.create({ title: 'Soft Structures', subtitle: 'KNITWEAR', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80', tag: 'KNITS', height: 340 });
  await lookService.create({ title: 'Urban Silhouette', subtitle: 'STREET EDIT', image: 'https://images.unsplash.com/photo-1516820827855-3ea1bd6f79ea?w=600&q=80', tag: 'CASUAL', height: 380 });
  await lookService.create({ title: 'Evening Deco', subtitle: 'AFTER DARK', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80', tag: 'FORMAL', height: 360 });
  await lookService.create({ title: 'Weekend Edit', subtitle: 'OFF DUTY', image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=80', tag: 'CASUAL', height: 400 });
  await lookService.create({ title: 'Coastal Drift', subtitle: 'RESORT 25', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80', tag: 'RESORT', height: 320 });
  await lookService.create({ title: 'The Modernist', subtitle: 'MINIMAL', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', tag: 'FORMAL', height: 440 });
  await lookService.create({ title: 'Layer Report', subtitle: 'OUTERWEAR', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80', tag: 'OUTERWEAR', height: 350 });
  await lookService.create({ title: 'Textile Study', subtitle: 'FABRIC FOCUS', image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=600&q=80', tag: 'EDITORIAL', height: 300 });
  console.log('  ✓ Looks created');

  await userService.create({
    name: 'Test User',
    email: 'test@monograph.com',
    password: 'password123',
  });

  console.log('  ✓ Test user created (test@monograph.com / password123)');
  console.log('Database seeded successfully!');

  await app.close();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
