import { Server } from 'http';
import app from "./app";
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;

let server: Server;

const main = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lbzm3xv.mongodb.net/advance-note-app?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('Connect mongodb database using mongoose');
        server = app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
};

main();