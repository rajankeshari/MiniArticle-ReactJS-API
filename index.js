import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
//app.use(express.json());
app.use(cors());
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the BlogOfficial API');
})

//const CONNECTION_URL = "mongodb+srv://rajankeshari:rajankeshari123@clusters.sifp9.mongodb.net/Library?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>
    app.listen(PORT, function () {
        console.log(`Server running on port: ${PORT}`);
    })
)
    .catch((err) => console.log(err));

mongoose.set('useFindAndModify', false);



