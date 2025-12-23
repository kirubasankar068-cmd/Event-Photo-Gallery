import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function recoverOriginalData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to clusters database");
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections found:");
    collections.forEach(col => console.log(`- ${col.name}`));
    
    // Check photos collection
    const photosCollection = mongoose.connection.db.collection('photos');
    const photos = await photosCollection.find({}).toArray();
    
    if (photos.length > 0) {
      console.log(`\nFound ${photos.length} original photos!`);
      photos.forEach((photo, i) => {
        console.log(`${i+1}. ${photo.name || photo.title} - ${photo.description}`);
      });
    } else {
      console.log("No photos found in clusters database");
    }
    
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

recoverOriginalData();