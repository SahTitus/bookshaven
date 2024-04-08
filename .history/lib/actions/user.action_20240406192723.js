'use server'
import { connectDb } from "@lib/database";
import User from "@lib/database/models/user.model";
import { handleError } from "@utils";
import { validateUser } from "@utils/validateUser";
import bcrypt from "bcryptjs";

export const registerUser = async (userData) => {
    const { email, password, confirmPassword } = userData;

    console.log(use)

    try {
        const failsValidation = validateUser(userData, confirmPassword);

        if (failsValidation) {
            throw new Error(failsValidation);
        }

        await connectDb();
        const emailExists = await User.findOne({ email: email });

        if (emailExists) {
            throw new Error("Email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        await User.create({
            ...userData,
            password: hashedPassword,
        })

        return JSON.parse(JSON.stringify({ status: 200 }));
    } catch (error) {
        handleError(error.message)
    }
};