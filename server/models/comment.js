import mongoose from 'mongoose';

const commenttschema = new mongoose.Schema({
    comment:{
        type:String,
    },
    commentedBy:{
        type:String,
    },
    commentedTo:{
        type:String,
    }
})

const commentmodel = mongoose.model("comment",commenttschema);

export {commentmodel as Comment};