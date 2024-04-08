'use server'
import { connectDb } from "@lib/database";
import User from "@lib/database/models/user.model";
import { handleError } from "@utils";
import { validateUser } from "@utils/validateUser";
import bcrypt from "bcryptjs";

export const registerUser = async (userData) => {
    const { email, password, confirmPassword } = userData;

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


export async function authAdmin(password, user_id ) {
    console.log(password, user_id)
    try {
        await connectDb();

        const userData = await User.findById(user_id);

        if (password != process.env.ADMIN_PASSWORD) {
            throw new Error('Invalid Credentials')
        }
        if (!user_id || !userData._id) {
            throw new Error('Unauthorized access')
        }



        userData.isAdmin = true;
        const updatedUser = await User.findByIdAndUpdate(userData._id, userData, { new: true });

        return JSON.parse(JSON.stringify(updatedUser))
    } catch (error) {
        handleError(error.message)
    }
}
