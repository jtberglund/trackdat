import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import * as UserController from './users/controllers/user.controller';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
    cors({
        origin: 'http://localhost:5000',
    })
);

// define a route handler for the default home page
app.get('/', (req, res) => {
    res.send('Hello worlds!');
});

// start the Express server
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});

app.post('/users', [UserController.insert]);
