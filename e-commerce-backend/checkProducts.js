import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function checkProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const productsCollection = mongoose.connection.db.collection('products');
    const products = await productsCollection.find({}).toArray();
    
    console.log(`Found ${products.length} items in products collection:`);
    if (products.length > 0) {
      console.log("Your original data found!");
      products.forEach((item, i) => {
        console.log(`${i+1}. ${item.name || item.title} - ${item.description || 'No description'}`);
      });
      
      // Copy to photos collection
      const photosCollection = mongoose.connection.db.collection('photos');
      await photosCollection.insertMany(products);
      console.log("\nData copied to photos collection!");
    }
    
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

checkProducts();