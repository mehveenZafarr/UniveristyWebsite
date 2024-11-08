import express from 'express';
import authRoutes from './routes/authRoutes.js';
import connectMongo from './config/connectdb.js';
import dotenv from 'dotenv';
import aboutUsRoutes from './routes/aboutUsRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import academicsRoutes from './routes/academicsRoutes.js';
import programsRoutes from './routes/programsRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import cookieParser from 'cookie-parser';
import announcementRoutes from './routes/announcementRoutes.js';
import {fileURLToPath} from "url";
import { dirname } from 'path';
import path from 'path';
import cors from 'cors';

dotenv.config({path: '../.env'});
const app = express();
const port = process.env.PORT || 4000;
// api\uploads

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors())
app.use("/api/uploads", express.static(path.join(__dirname, "/uploads")))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/aboutUs', aboutUsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/academics', academicsRoutes);
app.use('/api/programs', programsRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/announce', announcementRoutes);

app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
    connectMongo();
});