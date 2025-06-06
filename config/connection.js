// import dotenv from "dotenv";
// import { Sequelize } from "sequelize";

// dotenv.config();

// export const sequelize = new Sequelize(
//     process.env.DATABASE_NAME,
//     process.env.DATABASE_USERNAME,
//     process.env.DATABASE_PASSWORD,
//     {
//         host: process.env.DATABASE_HOST,
//         dialect: 'mysql'
//     });

// export async function connectDB() {
//     try {
//         // const connectedDataBase = await sequelize.sync();
//         console.log("Connected Database!");
//     } catch (error) {
//         console.log("Failed connecting to database", { message: error.message });
//     }
// }


import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// Establish a connection to MongoDB
export async function connectDB() {
    try {
        const dbUri = process.env.MONGODB_URI;
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.DATABASE_NAME,
        });
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Failed connecting to MongoDB", { message: error.message });
    }
}
