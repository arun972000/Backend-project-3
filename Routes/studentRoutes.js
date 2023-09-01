import express, { json } from 'express';
import { studentmodel, mentormodel } from '../DB connect/Model.js';
import { v4 } from 'uuid';


const StudentRoutes = express.Router()

StudentRoutes.use(json())

StudentRoutes.get("/", async (req, res) => {
    try {
        const studentsdata = await studentmodel.find({}, { id: 1, student_name: 1, mentor_name: 1, _id: 0 })

        res.send(studentsdata)

    } catch (err) {

        console.log(err)

        res.status(500).send("An error occurred");
    }

})

StudentRoutes.post("/", async (req, res) => {
    try {
        const student = new studentmodel({ ...req.body, id: v4(), mentor_name: "" })       // Creating a student

        await student.save()

        res.send("student created")

    } catch (err) {

        console.log(err)

        res.status(500).send("An error occurred");
    }

})

StudentRoutes.put("/assign-mentor/:id", async (req, res) => {
    try {
        // assigning single student to mentor
        const { id } = req.params

        const student = new studentmodel(req.body)

        await studentmodel.updateOne({ id: id }, { "$set": { mentor_name: student.mentor_name } })

        const isstudent = await mentormodel.findOne({ students: { "$regex": student.student_name } })

        const ismentor = await mentormodel.findOne({ mentor_name: { "$regex": student.mentor_name } })


        //IF student is already with mentor this case will applicable
        if (isstudent) {

            res.send("This student has already assigned to another mentor")
        }


        //  If mentor is availabe there student will be assign to him
        else if (ismentor) {

            await mentormodel.updateOne({ mentor_name: student.mentor_name }, { $push: { students: student.student_name } })

            res.send("Student assigned to mentor successfully")
        }


        // If no mentor avalable in the name then new mentor will be created 
        else {
            const newmentor = new mentormodel({ id: v4(), mentor_name: student.mentor_name, students: [student.student_name] })

            await newmentor.save()

            res.send("Student assigned to mentor successfully")
        }
    } catch (err) {

        console.log(err)
    }
})



export default StudentRoutes;

