import { categories } from "@/lib/constants/categories";
import striptags from "striptags";
import * as Yup from 'yup';

const countWords = (content) => {
    // Remove extra white spaces and line breaks
    const cleanedContent = content?.replace(/\s+/g, " ").trim();
    const words = cleanedContent?.split(" ");

    // Filter out empty words (e.g., multiple white spaces)
    const filteredWords = words?.filter((word) => word !== "");

    return filteredWords?.length;
};

export const readingTime = (content) => {
    const strippedText = striptags(content);
    const wordsPerMinute = 200;

    const words = countWords(strippedText);
    const time = Math.ceil(words / wordsPerMinute);

    return time;
};

export const handleError = (error) => {
    console.error('Error ---->', error);

    throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
};

export const bookValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    author_firstName: Yup.string().required('Author`s firstName is required'),
    author_lastName: Yup.string().required('Author`s lastName is required'),
    slug: Yup.string().required('Slug is required'),
    image: Yup.string().required('Image is required'),
    content: Yup.string().required('Content is required'),
    description: Yup.string(),
    category: Yup.string().required('Category is required'),
    genre: Yup.string().required('Genre is required'),
    ISBN: Yup.string().required('ISBN is required'),
    price: Yup.number().required('Price is required'),
    pages: Yup.string('Number of pages is required'),
    availability: Yup.boolean().required('Availability is required'),
});

export const signInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

export const signUpSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
});

export const newsletterValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
});

export const contactMeValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string()
        .required('Message is required')
        .min(6, 'Message should contain more than 5 characters'),
    phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, 'Phone number must contain only numbers')
        .required('Phone number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
});


export const slugify = (content) => {
    return content.toLowerCase().replace(/\s+/g, "-")
}

export const getSubCategories = (mainCategory) => {
    const foundCategory = categories.find(category => category.category_id === mainCategory);

    if (foundCategory && foundCategory.subCategories) {
        const subCategoryNames = foundCategory.subCategories.map(subCategory => subCategory.name);

        return subCategoryNames;
    } else {
        return [];
    }
};

export const extractCategories = () => {
    return categories.map(category => {
        return {
            category_id: category.category_id,
            category_name: category.name
        }
    });
};

// Utility function to extract subcategory IDs
export const extractSubCategories = () => {
    const subCategoryIdsSet = new Set();

    categories.map(category => {
        category?.subCategories?.map(subCategory => {
            subCategoryIdsSet.add(subCategory.subCategory_id);
        });
    });

    return [...subCategoryIdsSet];
};
