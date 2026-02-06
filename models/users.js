import mongoose from "mongoose";
import { lowercase, minLength, trim } from "zod";
import { is } from "zod/locales";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    },
    password: {
    type: String,
    required: true,
    minlength: 6,
    },
    role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    },
    isActive: {
    type: Boolean,
    default: true,
    }
},
{
    timestamps: true,
    strict: true,
}
);

const User = mongoose.model("User", userSchema);

export default User;