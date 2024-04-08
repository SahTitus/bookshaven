'use client'
import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, } from 'formik';
import { contactMeValidationSchema, handleError, } from '@utils';
import { initialValues } from '@lib/constants/initialValues';
import { endpoints } from '@lib/api/endpoints';
import { useStateContex } from '@redux/StateProvider';

const fieldStyles = `shadow appearance-none bg-zinc-800 py-4 border border-slate-600 rounded w-full py-2 px-5 text-gray-300 leading-tight focus:outline-none focus:shadow-outline`
export const ContactMeForm = () => {
    const [submissionStatus, setSubmissionStatus] = useState('');
    const { setShowLoaderOverlay } = useStateContex();

    useEffect(() => {
        if (submissionStatus === 'success') {
            const timeoutId = setTimeout(() => {
                setSubmissionStatus('');
            }, 7000);

            // Cleanup the timeout to avoid memory leaks
            return () => clearTimeout(timeoutId);
        };
    }, [submissionStatus]);


    const sendEmail = async (data) => {
        setSubmissionStatus('loading')
        setShowLoaderOverlay(true)
        try {
            const response = await fetch(endpoints.email, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                        ...data,
                        emailType: 'contactMe',
                        subject: data?.subject,
                    }
                }),
                mode: 'cors',
            });
            setShowLoaderOverlay(false)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setSubmissionStatus('success')
            return 'ok';
        } catch (error) {
            setSubmissionStatus('')
            setShowLoaderOverlay(false)
            handleError(error);
        }
    };

    const submit = async (values, { resetForm }) => {
        const res = await sendEmail(values);

        if (res === 'ok') {
            resetForm()
        }
    };

    return (
        <div className={` flex w-full  `}>
            <Formik initialValues={initialValues.contactMe} validationSchema={contactMeValidationSchema} onSubmit={submit}>
                {() => (
                    <Form className="bg-zinc-900 shadow-md rounded px-4 py-5 gap-3 flex flex-col w-full">
                        <p className='text-3xl text-gray-300 mb-4'>Drop me a line </p>
                        <div className='flex gap-4'>
                            <div>
                                <Field placeholder='First name' className={fieldStyles} type="text" name="firstName" />
                                <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                            <div>
                                <Field placeholder='Last name' className={fieldStyles} type="text" name="lastName" />
                                <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                        </div>

                        <div className='flex gap-4'>
                            <div>
                                <Field placeholder='Email' className={fieldStyles} type="text" name="email" />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                            <div>
                                <Field placeholder='Phone number' className={fieldStyles} type="text" name="phoneNumber" />
                                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                        </div>
                        <Field placeholder='Subject' className={fieldStyles} type="text" name="subject" />
                        <ErrorMessage name="subject" component="div" className="text-red-500 text-xs mt-1" />

                        <Field as="textarea" rows={8} placeholder='Message' className={fieldStyles} type="text" name="message" />
                        <ErrorMessage name="message" component="div" className="text-red-500 text-xs mt-1" />

                        {
                            submissionStatus === 'success' ? <p className="text-green-500 text-sm font-bold mt-4"> Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p> : <button
                                className="px-30 flex items-center justify-center mx-auto w-1/2 bg-gradient-to-br from-purple-600 to-tomato text-white shadow-inner shadow-fuchsia-400 font-bold py-3 rounded focus:outline-none focus:shadow-outline "
                                type="submit"
                                aria-label='submit button'
                            >
                                Submit
                            </button>
                        }
                    </Form>
                )}
            </Formik>
        </div>
    );
};