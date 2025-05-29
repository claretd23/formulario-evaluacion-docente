import { Schema, model } from 'mongoose';

const DatesSchema = new Schema({
    Name:{
        type:String,
        required:true
    },
    Last_name:{
        type:String,
        required:true
    },
    Age:{
        type:Number,
        required:true
    },
    Date:{
        type:Date,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    }
})

export const DatesModel = model('dates', DatesSchema)