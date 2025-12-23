import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function findOriginalData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    
    // Check test database
    const testDB = mongoose.connection.useDb('test');
    const testCollections = await testDB.listCollections().toArray();
    console.log("Collections in 'test' database:");
    testCollections.forEach(col => console.log(`- ${col.name}`));
    
    // Check for photos in test database
    if (testCollections.find(col => col.name === 'photos')) {
      const photos = await testDB.collection('photos').find({}).toArray();
      console.log(`Found ${photos.length} photos in test database`);
      if (photos.length > 0) {
        console.log("Your original data found in test database!");
        photos.forEach((photo, i) => {
          console.log(`${i+1}. ${photo.name || photo.title}`);
        });
      }
    }
    
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

findOriginalData();