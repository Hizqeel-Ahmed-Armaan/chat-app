import express from 'express';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import connectDB from './database/db.js';
import messageRoutes from './routes/message.routes.js';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { app, server } from './database/socket.js';
dotenv.config();

const PORT = process.env.PORT || 3000

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.NODE_ENV === "production"
        ? true // allow same-origin requests in production
        : "http://localhost:5173",
    credentials: true
}))

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../Frontend/dist")))
    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
    });
}

connectDB().then(server.listen(PORT, () => {
    console.log('Server running properly!');
} ));
