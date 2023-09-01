import express, { json } from 'express';
import StudentRoutes from './Routes/studentRoutes.js';
import DBclient from './DB connect/Mongoose.js';
import MentorRoutes from './Routes/mentorRoutes.js';

const app = express();

app.use("/students",StudentRoutes)
app.use("/mentors",MentorRoutes)

await DBclient()

app.use(json())

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.send("Mentor and Student API")
});

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));