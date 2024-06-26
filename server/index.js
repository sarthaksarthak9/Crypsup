import express from 'express';
import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();
import { userrouter } from './routes/user.js';
import { supporterrouter } from './routes/supporter.js'
import { projectrouter } from './routes/project.js';
import cors from 'cors';
import { commentrouter } from './routes/comment.js';

const PORT = process.env.PORT || 3000;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/authentication');

app.get('/', (req, res) => {
    res.send("hii");
});

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use('/auth', userrouter);
app.use('/username', projectrouter);
app.use('/auth', supporterrouter);
app.use('/comment',commentrouter)

app.listen(PORT, (err) => {
    if (err) {
        console.log('server crashed!');
    } else {
        console.log(`server is started at port ${PORT}`)
    }
});
