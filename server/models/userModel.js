import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, 
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
});   

const Users = mongoose.model("user", userSchema);
export default Users;
   