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


export async function authAdmin({password, user_id}) {
    try {
        await connectDb();

        const creator = await User.findById(user_id);

                        // if (!creator.isAdmin) {
        //     throw new Error('Unauthorized access')
        // }

        const BookToUpdate = await Book.findById(Book._id)



        if (!BookToUpdate || BookToUpdate.creator._id.toHexString() !== user_id) {
            throw new Error('Unauthorized or Book not found')
        }

        Book.modifiedAt = new Date();
        const updatedBook = await Book.findByIdAndUpdate(Book._id, Book, { new: true });

        revalidatePath(`/Book/${Book._id}`)

        return JSON.parse(JSON.stringify(updatedBook))
    } catch (error) {
        handleError(error.message)
    }
}
