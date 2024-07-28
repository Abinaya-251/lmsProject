import mon from "mongoose"

const AdminSchema = new mon.Schema({
    adminName:String,
    email:{type:String},
    password:String,
}) 
const adminModel = mon.model("Admin",AdminSchema);

export default adminModel;
