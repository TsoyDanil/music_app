import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import IUser from "../interfaces/IUser";

const UserSchema: Schema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        trim: true,
        minlength: 1,
        required: [true, 'Username should exist']
    },
    password: {
        type: String,
        trim: true,
        minlength: 1,
        required: [true, 'Password should exist']
    },
    role: {
        type: String,
        required: false,
        default: 'user'
    }
},{versionKey: false})

UserSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
    next()
})

UserSchema.set('toJSON', {transform(doc, ret, options) {
    delete ret.password
    return ret
}})

UserSchema.methods.checkPassword = async function(password: string) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model<IUser>('User', UserSchema)