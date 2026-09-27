import mongoose from "mongoose";
import productModel from "./models/productModel.js";
import 'dotenv/config';

const sampleProducts = [
  {
    name: "Handcrafted Zardozi Silk Saree",
    description: "A breathtaking deep maroon silk saree featuring intricate gold Zardozi embroidery, handcrafted by master artisans in Varanasi. Perfect for elegant evening wear.",
    price: 25000,
    image: ["/product_saree.png"],
    category: "Women",
    subCategory: "Ethnic",
    sizes: ["Free Size"],
    date: Date.now(),
    bestseller: true
  },
  {
    name: "Ivory & Gold Bridal Lehenga",
    description: "A stunning ivory lehenga with rich gold mirror work and thread embroidery, inspired by the heritage of Kutch. A masterpiece of traditional craftsmanship.",
    price: 45000,
    image: ["/product_lehenga.png"],
    category: "Women",
    subCategory: "Ethnic",
    sizes: ["S", "M", "L", "Custom"],
    date: Date.now() - 1000,
    bestseller: true
  },
  {
    name: "Midnight Blue Zari Anarkali",
    description: "A luxurious Anarkali suit featuring heavy silver zari embroidery on midnight blue fabric. A regal choice for festive occasions.",
    price: 32000,
    image: ["/product_anarkali.png"],
    category: "Women",
    subCategory: "Ethnic",
    sizes: ["S", "M", "L"],
    date: Date.now() - 2000,
    bestseller: true
  },
  {
    name: "Emerald Green Silk Kurta Set",
    description: "A beautiful silk kurta set in deep emerald green, adorned with intricate gold floral embroidery. Comfort meets supreme elegance.",
    price: 18500,
    image: ["/product_kurta.png"],
    category: "Women",
    subCategory: "Ethnic",
    sizes: ["M", "L", "XL"],
    date: Date.now() - 3000,
    bestseller: true
  },
  {
    name: "Ivory & Gold Men's Sherwani",
    description: "A classic ivory silk sherwani with exquisite gold threadwork. Handcrafted for the modern groom who appreciates tradition.",
    price: 55000,
    image: ["/product_sherwani.png"],
    category: "Men",
    subCategory: "Ethnic",
    sizes: ["M", "L", "XL"],
    date: Date.now() - 4000,
    bestseller: true
  },
  {
    name: "Handwoven Banarasi Dupatta",
    description: "A vibrant handwoven silk dupatta featuring rich Banarasi zari work. The perfect statement accessory for any traditional outfit.",
    price: 8500,
    image: ["/product_dupatta.png"],
    category: "Women",
    subCategory: "Accessories",
    sizes: ["Free Size"],
    date: Date.now() - 5000,
    bestseller: true
  },
  {
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.",
    price: 100,
    image: ["/p_img1.png"],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: Date.now() - 6000,
    bestseller: true
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A premium pure cotton t-shirt with great fit and breathability.",
    price: 200,
    image: ["/p_img2_1.png", "/p_img2_2.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: Date.now() - 7000,
    bestseller: true
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "Comfortable and stylish round neck cotton top for girls.",
    price: 220,
    image: ["/p_img3.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    date: Date.now() - 8000,
    bestseller: true
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description: "Clean aesthetic tapered flat-front trousers suitable for formal and casual wear.",
    price: 190,
    image: ["/p_img7.png"],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "L", "XL"],
    date: Date.now() - 9000,
    bestseller: false
  },
  {
    name: "Women Palazzo Pants with Waist Belt",
    description: "Airy, graceful palazzo pants with tailored waist belt.",
    price: 190,
    image: ["/p_img20.png"],
    category: "Women",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    date: Date.now() - 10000,
    bestseller: false
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description: "Comfortable zip-front jacket crafted for winter elegance.",
    price: 170,
    image: ["/p_img21.png"],
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    date: Date.now() - 11000,
    bestseller: false
  }
];

async function seed() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
    const count = await productModel.countDocuments();
    if (count === 0) {
      await productModel.insertMany(sampleProducts);
      console.log(`Seeded ${sampleProducts.length} products successfully.`);
    } else {
      console.log(`Database already has ${count} products. Skipping seed.`);
    }
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seed();
