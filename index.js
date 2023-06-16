import express from 'express';
import config from './db/config.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Hello and welcome to my api")
});

app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);


app.listen(config.port, () => {
    console.log(`Server running at http://${config.host}:${config.port}`);
});

