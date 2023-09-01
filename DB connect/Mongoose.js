import mongoose from "mongoose";


const DBclient = async () => {
    try {
        await mongoose.connect("mongodb+srv://arunpandian972000:VYku76ZoIs3qhhgL@cluster0.eqbprpg.mongodb.net/MentorandStudent?retryWrites=true&w=majority", { useNewUrlParser: true })
        console.log("db connected")
    } catch (err) {
        console.log(err)
    }

}


export default DBclient