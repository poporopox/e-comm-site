
import mongoose from "mongoose";



// Step 1: Establish connection to MongoDB

// Step 2: Define and use the model
const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: false},
    image: { type: String, required: true },
    category:{ type:String, required:true}
});

// Define or retrieve the "pet" model
const petModel = mongoose.models.pet || mongoose.model("pet", petSchema);
export default petModel;
