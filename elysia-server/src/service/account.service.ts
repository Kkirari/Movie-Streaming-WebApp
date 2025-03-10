import mongoose from "mongoose";
import { User } from "../models/user.model"
import { login, register, updateProfile } from "../types/account.type"
import { user } from "../types/account.type";

export const AccountService = {



    login: async function (loginData: login): Promise<user> {
        const user = await User.findOne({ username: loginData.username })
            .exec()
        if (!user)
            throw new Error('User does not exist')
        const verifyPassword = await user.verifyPassword(loginData.password)
        if (!verifyPassword)
            throw new Error('Password does not exist')
        return user.toUser()
    },


    createNewUser: async function (registerData: register): Promise<user> {
        const user = await User.findOne({ username: registerData.username }).exec()
        if (user)
            throw new Error(`${registerData.username} already exists`)
        const newUser = await User.createUser(registerData)
        return newUser.toUser()
    },

    updateProfile: async function (newProfile: updateProfile, user_id: string): Promise<user> {
        const user = await User.findByIdAndUpdate(new mongoose.Types.ObjectId(user_id), { $set: newProfile }, { new: true, runValidators: true });
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            throw new Error("Invalid user ID");
        }

        if (user)
            return user.toUser()
        throw new Error('Something went wrong')
    },

}