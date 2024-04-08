'use client'
import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, } from 'formik';
import { signInSchema, signUpSchema } from '@utils';
// import { GoogleAuth } from '@components/GoogleAuth';
import { Backdrop } from '@components/Backdrop';
import Logo from '@components/Logo';
import { useSession } from 'next-auth/react';
import { useAppDispatch } from '@redux/store';
import { useStateContex } from '@redux/StateProvider';
import { userData } from '@redux/features/authSlice';
import { handleAuthFormSubmit } from '@utils/handleAuthFormSubmit';
import { initialValues } from '@lib/constants/initialValues';

const fieldStyles = `shadow appearance-none bg-zinc-800 py-4 border border-slate-600 rounded w-full py-2 px-5 text-gray-300 leading-tight focus:outline-none focus:shadow-outline`
export const AuthForm = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [error, setError] = useState('');
    const { showAuthForm, setShowAuthForm, setShowLoaderOverlay, toggleShowAuthForm } = useStateContex();

    const session = useSession();
    const dispatch = useAppDispatch()

    useEffect(() => {
        const { status, data } = session;

        if (status === "authenticated" && data?.user?.email) {
            dispatch(userData(data.user));
        }

        if (status != 'loading' && status === "unauthenticated" && !showAuthForm) {
            const timeoutId = setTimeout(() => {
                setShowAuthForm(true);
            }, 5000);

            // Cleanup the timeout to avoid memory leaks
            return () => clearTimeout(timeoutId);
        };
    }, [session]);

    const validationSchema = isSignIn ? signInSchema : signUpSchema;

    const submit = async (values) => {
        handleAuthFormSubmit({ formData: values, isSignin: isSignIn, setError, setShowLoaderOverlay, toggleShowAuthForm })
    };

    return (
        <div className={`${!showAuthForm ? "hidden" : ''} fixed grid items-center top-0 bottom-0  z-50 left-0 right-0`}>
            <div className="relative flex-col mt-6 flex items-center justify-center select-none w-11/12  md:w-[70%] max-w-xl mx-auto text-center md:text-start rounded-lg border px-5 py-4 transition-colors z-50  border-neutral-700 bg-gray-900">
                < Logo height={100} width={120} />
                <button
                    aria-label='close icon'
                    onClick={toggleShowAuthForm}
                    className="absolute top-3 right-3 text-gray-200 hover:text-gray-500  focus:outline-none focus:text-gray-500  h-12 w-12 text-3xl"
                >
                    &#x2715;
                </button>
                <div className='flex justify-between gap-4 mb-3 mt-5'>
                    <h2 onClick={() => setIsSignIn(true)} className={`${isSignIn ? 'border-b border-zinc-500 rounded-lg' : ''} flex items-center justify-center text-xl font-bold  py-2 px-5 text-gray-300 cursor-pointer`}>Sign in</h2>
                    <h2 onClick={() => setIsSignIn(false)} className={`${!isSignIn ? 'border-b border-zinc-700 rounded-lg ' : ''} flex items-center justify-center text-xl font-bold  py-2 px-5 text-gray-300 cursor-pointer`}>Sign up</h2>
                </div>
                <p className={`m-0 md:max-w-[6
                    0ch] text-lg md:text-base opacity-50 mb-3`}>
                    Get the best experience on this app by signing in.
                </p>
                <Formik initialValues={initialValues.user} validationSchema={validationSchema} onSubmit={submit}>
                    {({ values }) => (
                        <Form className="bg-zinc-900 shadow-md rounded px-4 py-5 gap-3 flex flex-col w-full">
                            {!isSignIn && <>
                                <Field placeholder='Firstname' className={fieldStyles} type="text" name="name" />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                                <Field placeholder='Lastname' className={fieldStyles} type="text" name="lastName" />
                                <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1" />
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
                                className=" bg-gradient-to-br from-purple-600 to-tomato text-white shadow-inner shadow-fuchsia-400 font-bold py-3 rounded focus:outline-none focus:shadow-outline "
                                type="submit"
                                aria-label='submit button'
                            >
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
                <div className="flex items-center justify-center my-4 z-40 w-full px-1">
                    <p className="h-[1px] z-50 bg-gray-700 border-none w-full" />
                    <span className="m-0 mx-2 text-base text-gray-500">or</span>
                    <hr className="h-[1px] bg-gray-700 border-none w-full" />
                </div>
            </div >
            <Backdrop />
        </div>
    );
};