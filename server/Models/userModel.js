import mon from "mongoose"

const StudentSchema = new mon.Schema({
    studentName :String,
    email:{type:String},
    password:String,
    purchasedCourses: [{ type: mon.Schema.Types.ObjectId, ref: 'Course' }]
}) 
const userModel = mon.model("student",StudentSchema);

export default userModel;
