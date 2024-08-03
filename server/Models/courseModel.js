import mon from "mongoose"

const courseSchema = new mon.Schema({
    title:String,
    description:String,
    price:Number,
    imageLink:String,
    published:Boolean,
    NumberOfStudentPurchased: {
        type: Number,
        default: 0
    }

})
 
const CourseModel = mon.model("Course",courseSchema)
export default CourseModel;