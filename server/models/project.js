import mongoose from 'mongoose';

const projectschema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    createdBy: {
        type: String,
        required: true, 
    },
    walletaddressofuser:{
        type: String,
        required: true, 
    }
})

const projectmodel = mongoose.model("project",projectschema);

export {projectmodel as Project};