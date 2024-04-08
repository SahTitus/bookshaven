'use client'
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Dropzone } from './DropZone';
import { bookValidationSchema, handleError } from '@/utils';
import { createBook, updateBook } from '@/lib/actions/book.action';
import { categories } from '@/lib/constants/categories';
import { useAppSelector } from '@/redux/store';
import { useStateContex } from '@/redux/StateProvider';

const fieldStyles = `shadow appearance-none bg-slate-200 py-4 border border-zinc-500 rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline`
const labelStyles = `block text-zinc-700 text-lg font-bold mb-2 mt-6 `;

const BookForm = ({ defaultFormValues, slug, revalidatePath }) => {
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const { user } = useAppSelector((state) => state.auth);
  const { setShowLoaderOverlay } = useStateContex();

  const path = { name: "/" }
  const handleSubmit = async (values) => {
    setSubmissionStatus('loading');
    setShowLoaderOverlay(true);

    const user_id = user?.id;
    try {
      if (slug) {
        await updateBook(values, user_id)
      } else {
        await createBook(values, user_id)
      }
      setSubmissionStatus('success');
      setShowLoaderOverlay(false);

    } catch (error) {
      setShowLoaderOverlay(false);
      setSubmissionStatus('error');
      handleError(`POST-UPDATE book ERR:${error}`)
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      <h1 className='mt-6 text-3xl font-bold'>Add a Book</h1>
      <Formik initialValues={defaultFormValues} validationSchema={bookValidationSchema} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form className="bg-white rounded px-2 md:px-8 pt-6 pb-8 mb-4 flex flex-col w-11/12 md:w-3/4 ">
            <label className={labelStyles} htmlFor="title">
              Title
            </label>
            <Field className={fieldStyles} type="text" name="title" />
            <ErrorMessage name="title" component="div" className="text-red-500 text-xs mt-1" />

            <label className={labelStyles} htmlFor="slug">
              Slug
            </label>
            <Field
              className={fieldStyles}
              type="text"
              name="slug"
              value={values.slug.toLowerCase().replace(/\s+/g, "-")}
              onChange={(e) => {
                const sanitizedSlug = e.target.value.toLowerCase().replace(/\s+/g, "-")
                setFieldValue('slug', sanitizedSlug);

              }}
            />

            <ErrorMessage name="slug" component="div" className="text-red-500 text-xs mt-1" />

            <label className={labelStyles} htmlFor="image">
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


            <label className={labelStyles} htmlFor="description">
              Description (optional)
            </label>
            <Field className={fieldStyles} type="text" name="description" />
            <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1" />

            <label className={labelStyles} htmlFor="category">
              Genre
            </label>
            <Field
              as="select"
              className={fieldStyles}
              name="category"
              onChange={(e) => {
                const selectedCategory = e.target.value;
                const category = categories.find((c) => c.name === selectedCategory);
                setFieldValue('category', selectedCategory);
                setFieldValue('category_id', category ? category.category_id : '');
                setFieldValue('subCategory', ''); // Reset subCategory when category changes

              }}
            >
              <option value="" disabled>Select a category</option>
              {categories?.map((category) => (
                <option key={category?.category_id} value={category?.name}>
                  {category?.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="category" component="div" className="text-red-500 text-xs mt-1" />
            <label className={labelStyles} htmlFor="category">
              Category
            </label>
            <Field
              as="select"
              className={fieldStyles}
              name="category"
              onChange={(e) => {
                const selectedCategory = e.target.value;
                const category = categories.find((c) => c.name === selectedCategory);
                setFieldValue('category', selectedCategory);
                setFieldValue('category_id', category ? category.category_id : '');
                setFieldValue('subCategory', ''); // Reset subCategory when category changes

              }}
            >
              <option value="" disabled>Select a category</option>
              {categories?.map((category) => (
                <option key={category?.category_id} value={category?.name}>
                  {category?.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="category" component="div" className="text-red-500 text-xs mt-1" />

            
            <ErrorMessage name="subCategory" component="div" className="text-red-500 text-xs mt-1" />

            <ErrorMessage name="isTutorial" component="div" className="text-red-500 text-xs mt-1" />

            <div className='flex items-center gap-2'>
              <label className={labelStyles} htmlFor="availability">
               Availability
              </label>
              <Field
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-700 mt-4"
                name="availability"
              />
              <ErrorMessage name="availability" component="div" className="text-red-500 text-xs mt-1" />

            </div>


            <label className={labelStyles} htmlFor="author_firstName">
              Author FirstName
            </label>
            <Field className={fieldStyles} type="text" name="author_firstName" />
            <ErrorMessage name="author_firstName" component="div" className="text-red-500 text-xs mt-1" />

            <label className={labelStyles} htmlFor="author_lastName">
              Author LastName
            </label>
            <Field className={fieldStyles} type="text" name="author_lastName" />
            <ErrorMessage name="author_lastName" component="div" className="text-red-500 text-xs mt-1" />

            <label className={labelStyles} htmlFor="ISBN">
              ISBN
            </label>
            <Field className={fieldStyles} type="text" name="ISBN" />
            <ErrorMessage name="ISBN" component="div" className="text-red-500 text-xs mt-1" />
            
            <label className={labelStyles} htmlFor="price">
              Price
            </label>
            <Field className={fieldStyles} type="number" name="price" />
            <ErrorMessage name="price" component="div" className="text-red-500 text-xs mt-1" />

            <label className={labelStyles} htmlFor="pages">
             Number of Pages
            </label>
            <Field className={fieldStyles} type="number" name="pages" />
            <ErrorMessage name="pages" component="div" className="text-red-500 text-xs mt-1" />



            <br />
            <div className=' py-6'>
              {submissionStatus === 'loading' && <p className="text-gray-700 text-sm font-bold mt-4">Submitting...</p>}
              {submissionStatus === 'success' && <p className="text-green-500 text-sm font-bold mt-4">Submission successful!</p>}
              {submissionStatus === 'error' && <p className="text-red-500 text-sm font-bold mt-4">Submission failed. Please try again.</p>}

            </div>

            <button
              className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
              type="submit"
              aria-label='submit button'
              disabled={submissionStatus === 'loading'}
            >
              Submit
            </button>

          </Form>
        )}
      </Formik>
    </div >
  );
};

export default BookForm;