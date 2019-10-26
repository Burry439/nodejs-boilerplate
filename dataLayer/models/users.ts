import * as mongoose from 'mongoose'


    const userSchema = new mongoose.Schema({    
         name :  mongoose.Schema.Types.String,
         age : mongoose.Schema.Types.Number
    });


export =  mongoose.model('users',  userSchema)