import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const DBConnection = async () => {
    try {
        const USERNAME = process.env.DB_USERNAME;
        const PASSWORD = process.env.DB_PASSWORD;

        const MONGO_URI = `mongodb://user:beingashutosh@ac-d3hcbjx-shard-00-00.hoq0vtb.mongodb.net:27017,ac-d3hcbjx-shard-00-01.hoq0vtb.mongodb.net:27017,ac-d3hcbjx-shard-00-02.hoq0vtb.mongodb.net:27017/?ssl=true&replicaSet=atlas-z4uzq3-shard-0&authSource=admin&retryWrites=true&w=majority&appName=file-sharing`;

        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database ', error.message);
        // It's a good practice to throw the error here if you're not handling it further
        throw error;
    }
}

export default DBConnection;
