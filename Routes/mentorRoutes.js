import express, { json } from 'express';
import { mentormodel, studentmodel } from '../DB connect/Model.js';
import { v4 } from 'uuid';


const MentorRoutes = express.Router()

MentorRoutes.use(json())

MentorRoutes.get("/", async (req, res) => {

    try {
        const mentorsdata = await mentormodel.find({}, { id: 1, mentor_name: 1, students: 1, _id: 0 })

        res.send(mentorsdata)

    } catch (err) {

        console.log(err)
    }

})

MentorRoutes.post("/", async (req, res) => {
    try {
        const mentor = new mentormodel({ ...req.body, id: v4(), students: [] })

        await mentor.save()

        res.send("student created")

    } catch (err) {

        console.log(err)

        res.status(500).send("An error occurred");
    }

})


MentorRoutes.get("/:id", async (req, res) => {

    const { id } = req.params

    const mentor = await mentormodel.findOne({ id: id })

    res.send(mentor)
})

MentorRoutes.put("/assign-students/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const mentor = new mentormodel(req.body);

        await mentormodel.updateOne({ id: id }, { "$push": { students: mentor.students } });

        await studentmodel.updateMany({ student_name: { "$in": mentor.students } }, { $set: { mentor_name: mentor.mentor_name } });

        res.send("Students assigned to mentor successfully");

    } catch (err) {

        console.error(err);

        res.status(500).send("An error occurred");
    }
});


export default MentorRoutes;