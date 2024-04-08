'use client'
import React, { useState } from 'react';
import { useStateContex } from '@redux/StateProvider';
import { Formik, Field, Form, ErrorMessage, } from 'formik';
import { initialValues } from '@lib/constants/initialValues';
import { subscribeNewsletter } from '@lib/actions/newsletter.action';
import { newsletterValidationSchema, handleError, sendEmail } from '@utils';

const fieldStyles = `shadow appearance-none bg-zinc-800 py-4 border border-slate-600 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline`
export const NewsletterForm = () => {
  const [submissionStatus, setSubmissionStatus] = useState('');
  const { setShowLoaderOverlay } = useStateContex();

  const subscribe = async (values) => {
    setShowLoaderOverlay(true);

    try {
      const subscribedUser = await subscribeNewsletter(values);

      if (!subscribedUser._id) {
        throw new Error(`HTTP error`);
      }

      const data = {
        ...subscribedUser,
        emailType: 'subsThanks',
        subject: `Thank You for Subscribing to our Updates`
      }

      await sendEmail(data);
      setSubmissionStatus('success');
    } catch (error) {
      handleError(error);
      setSubmissionStatus('error');
    } finally {
      setShowLoaderOverlay(false);
    }
  };

  return (
    <div className="group text-center md:text-start rounded-lg border px-5 py-4 transition-colors  bg-gray-100 border-neutral-700 bg-neutral-800/30">
      {submissionStatus != 'success' &&
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Newsletter{' '}
        </h2>}

      <div className="bg-dark mt-6 flex items-center justify-center select-none">
        {submissionStatus === 'success' ? <div className="flex items-center justify-center ">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Thank you for subscribing!</h1>
            <p className="text-gray-300">We appreciate your interest in our newsletter.</p>
          </div>
        </div> : <Formik initialValues={initialValues.newsletter} validationSchema={newsletterValidationSchema} onSubmit={subscribe}>
          {() => (
            <Form className="bg-zinc-900 shadow-md rounded px-4 py-5 gap-3 flex flex-col w-full">
              <p className={`m-0 md:max-w-[30ch] text-lg md:text-base opacity-50`}>
                Be the first to receive the latest content by signing up.
              </p>
              <Field placeholder='Your name' className={fieldStyles} type="text" name="name" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />

              <Field placeholder='Email' className={fieldStyles} type="text" name="email" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />

              <div className=' py-3'>
                {submissionStatus === 'loading' && <p className="text-gray-700 text-sm font-bold mt-4">Submitting...</p>}
                {submissionStatus === 'success' && <p className="text-green-500 text-sm font-bold mt-4">Submission successful!</p>}
                {submissionStatus === 'error' && <p className="text-red-500 text-sm font-bold mt-4">Submission failed. Please try again.</p>}
              </div>
              <button
                className=" bg-gradient-to-br from-purple-600 to-tomato text-white shadow-inner shadow-fuchsia-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                type="submit"
                aria-label='submit button'
              >
                Subscribe
              </button>
            </Form>
          )}
        </Formik>}
      </div >
    </div>
  );
};