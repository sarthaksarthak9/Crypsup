import mongoose from 'mongoose';

const supporterschema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
})

const supportermodel = mongoose.model("supporter",supporterschema);

export {supportermodel as Supporter};