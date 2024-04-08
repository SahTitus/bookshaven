'use client'
import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, } from 'formik';
import { signInSchema, signUpSchema } from '@utils';
// import { GoogleAuth } from '@components/GoogleAuth';
import { useSession } from 'next-auth/react';
import { useAppDispatch } from '@redux/store';
import { useStateContex } from '@redux/StateProvider';
import { userData } from '@redux/features/authSlice';
import { handleAuthFormSubmit } from '@utils/handleAuthFormSubmit';
import { initialValues } from '@lib/constants/initialValues';
import { Dropzone } from './DropZone';

const fieldStyles = `shadow text-zinc-900 appearance-none bg-slate-200 py-4 border border-zinc-500 rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline`
export const AuthForm = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [error, setError] = useState('');
    const { setShowLoaderOverlay,  } = useStateContex();

    const session = useSession();
    const dispatch = useAppDispatch()

    useEffect(() => {
        const { status, data } = session;

        if (status === "authenticated" && data?.user?.email) {
            dispatch(userData(data.user));
        }

    }, [session]);

    const validationSchema = isSignIn ? signInSchema : signUpSchema;

    const submit = async (values) => {
        handleAuthFormSubmit({ formData: values, isSignin: isSignIn, setError, setShowLoaderOverlay, toggleShowAuthForm })
    };

    return (
        <div className={``}>
            <div className="relative bg-[#f7f7f7] flex-col mt-20 flex items-center justify-center select-none w-11/12  md:w-[70%] max-w-xl mx-auto text-center md:text-start rounded-lg border px-5 py-4  ">
               
                <p className={`text-black m-0 md:max-w-[6
                    0ch] text-lg md:text-base 0 mb-3`}>
                    Get the best experience on this app by signing in.
                </p>
                <Formik  initialValues={initialValues.user} validationSchema={validationSchema} onSubmit={submit}>
                    {({ values, setFieldValue }) => (
                        <Form className="bg-[#f7f7f7]   shadow-md rounded px-4 py-5 gap-3 flex flex-col w-full">
                            {!isSignIn && <>
                                <label className='' htmlFor="image">
                                    Image
                                </label>
                                <Field name="image">{({ field, form, meta }) =>
                                    <Dropzone
                                        values={values}
                                        field={field}
                                        form={form}
                                        setFieldValue={setFieldValue}
                                    />}
                                </Field>
                                <ErrorMessage name="image" component="div" className="text-red-500 text-xs mt-1" />
                                <Field placeholder='Firstname' className={fieldStyles} type="text" name="name" />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                                <Field placeholder='Lastname' className={fieldStyles} type="text" name="lastName" />
                                <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1" />
                                <Field placeholder='Phone number' className={fieldStyles} type="text" name="tel" />
                                <ErrorMessage name="tel" component="div" className="text-red-500 text-xs mt-1" />
                            </>}

                            <Field placeholder='Email' className={fieldStyles} type="text" name="email" />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />

                            <Field placeholder='Password' className={fieldStyles} type="password" name="password" />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                            {!isSignIn && !!values?.password?.length &&
                                <>
                                    <Field placeholder='Confirm password' className={fieldStyles} type="password" name="confirmPassword" />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
                                </>
                            }
                            <p className='text-sm text-red-500'>{error}</p>
                            <button
                                className=" bg-red-500  font-bold py-3 rounded focus:outline-none focus:shadow-outline "
                                type="submit"
                                aria-label='submit button'
                            >
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>

                <div className='flex justify-between gap-4 mb-3 mt-5'>
                    <p onClick={() => setIsSignIn(true)} className={`${isSignIn ? 'border-b border-zinc-500 rounded-lg' : ''} flex items-center justify-center text-xl font-bold  py-2 px-5 text-gray-300 cursor-pointer`}>Sign in</p>
                    <p onClick={() => setIsSignIn(false)} className={`${!isSignIn ? 'border-b border-zinc-700 rounded-lg ' : ''} flex items-center justify-center text-xl font-bold  py-2 px-5 text-gray-300 cursor-pointer`}>Sign up</p>
                </div>
            </div >
        </div>
    );
};