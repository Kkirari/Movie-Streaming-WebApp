import mongoose, { Schema } from "mongoose";
import { IUserDocument, IUserModel } from "../interface/user.interface";
import { register, user } from "../types/account.type";

const schema = new Schema<IUserDocument, IUserModel>({
    username: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true }
}, {
    timestamps: true
});

// ✅ เพิ่ม _id ให้ API ที่ใช้ข้อมูล user
schema.methods.toUser = function (): user {
    return {
        id: this._id.toString(),
        username: this.username,
    };
};

schema.methods.verifyPassword = async function (password: string): Promise<boolean> {
    return await Bun.password.verify(password, this.password_hash);
};

schema.statics.createUser = async function (registerData: register): Promise<IUserDocument> {
    const newUser = new this({
        username: registerData.username,
        password_hash: await Bun.password.hash(registerData.password)
    });
    await newUser.save();
    return newUser;
};

export const User = mongoose.model<IUserDocument, IUserModel>("User", schema);
