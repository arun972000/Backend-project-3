import mongoose from "mongoose";


const studentschema= mongoose.Schema({
    id:{
        type:"string",
        required:true
    },
    student_name:{
        type:"string",
        required:true
    },
    mentor_name:{
        type:"string",
        required:false
    }
})

const mentorschema= mongoose.Schema({
    id:{
        type:"string",
        required:true
    },
    mentor_name:{
        type:"string",
        required:true
    },
    students:{
        type:"array",
        required:false
    }
})


export const studentmodel= mongoose.model("students",studentschema)
export const mentormodel= mongoose.model("mentors",mentorschema)