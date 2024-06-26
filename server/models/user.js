import mongoose from 'mongoose';

const userschema = new mongoose.Schema({
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
    walletaddress:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})

const usermodel = mongoose.model("user",userschema);

export {usermodel as User};