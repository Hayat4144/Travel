import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        max: 20,
        min: 4
    },
    lastName:{
        type:String,
        trim:true,
        max:20,
        min:5
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        max: 20,
        min: 8
    },
    is_active: {
        type: Boolean,
        default: true
    },
    Phone_Number:{
        type:Number,
        min:10
    }
},
    {
        timestamps: {
            createdAt: 'created_at', 
            updatedAt: 'updated_at' 
        }
    }
)


const UserModal = new mongoose.model('user',UserSchema)

export default UserModal ;