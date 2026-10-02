import mongoose from "mongoose"
import config from "./config.js"


async function connectToDb() {
    await mongoose.connect(config.mongo_uri);
    console.log("connected to mongodb");
}

export default connectToDb;