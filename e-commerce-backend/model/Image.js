import mongoose from "mongoose";

const photoSchema = mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, default: 0},
    rating: {type: Number, default: 0},
    image: {type: String, required: true},
    description: {type: String, required: false},
    date: {type: String, required: false},
    time: {type: String, required: false},
    place: {type: String, required: false},
    guests: [{type: String}],
    comments: [{
        text: String,
        author: String,
        timestamp: {type: Date, default: Date.now}
    }],
    createdAt: {type: Date, default: Date.now}
});

export default mongoose.model("Photo", photoSchema);
