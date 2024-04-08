'use client'
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import TextEditor from './Editor';
import { Dropzone } from './DropZone';
import { bookValidationSchema, handleError } from '@/utils';
import { createBook, updateBook } from '@/lib/actions/book.action';
import { categories } from '@/lib/constants/categories';
import { useAppSelector } from '@/redux/store';
import { useStateContex } from '@/redux/StateProvider';

const fieldStyles = `shadow appearance-none bg-zinc-800 py-4 border border-slate-600 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline`
const labelStyles = `block text-gray-300 text-lg font-bold mb-2 mt-6 `;

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
    <div className="bg-dark min-h-screen flex items-center justify-center">
      <Formik initialValues={defaultFormValues} validationSchema={bookValidationSchema} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form className="bg-zinc-900 shadow-md rounded px-2 md:px-8 pt-6 pb-8 mb-4 flex flex-col w-11/12 md:w-3/4 ">
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
              Image URL
            </label>
            <Field name="image">{({ field, form, meta }) => <Dropzone
              values={values}
              field={field}
              form={form}
              setFieldValue={setFieldValue}
            />}
            </Field>
            <ErrorMessage name="image" component="div" className="text-red-500 text-xs mt-1" />

            <label className={labelStyles} htmlFor="image_id">
              Image ID
            </label>
            <Field className={fieldStyles} type="text" name="image_id" />
            <ErrorMessage name="image_id" component="div" className="text-red-500 text-xs mt-1" />

            <label className={labelStyles} htmlFor="summary">
              Summary
            </label>
            <Field className={fieldStyles} type="text" name="summary" />
            <ErrorMessage name="summary" component="div" className="text-red-500 text-xs mt-1" />

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

            <label className={labelStyles} htmlFor="subCategory">
              Sub Category
            </label>
            <Field
              as="select"
              className={fieldStyles}
              name="subCategory"
              onChange={(e) => {
                const selectedSubCategory = e.target.value;
                setFieldValue('subCategory', selectedSubCategory);
                setFieldValue('subCategory_id', categories.find((c) => c.name === values.category)?.subCategories.find((s) => s.name === selectedSubCategory)?.subCategory_id);
              }}
            >
              <option value="" disabled>Select a sub-category</option>
              {values?.category && categories.find((c) => c.name === values.category)?.subCategories?.map((subCategory) => (
                <option key={subCategory.subCategory_id} value={subCategory.name}>
                  {subCategory.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="subCategory" component="div" className="text-red-500 text-xs mt-1" />

            <div className='flex items-center gap-2'>
              <label className={labelStyles} htmlFor="isTutorial">
                Is Tutorial
              </label>
              <Field
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-700 mt-4 "
                name="isTutorial"
              />
            </div>
            <ErrorMessage name="isTutorial" component="div" className="text-red-500 text-xs mt-1" />

            <div className='flex items-center gap-2'>
              <label className={labelStyles} htmlFor="requiresAuth">
                Requires Authentication
              </label>
              <Field
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-700 mt-4"
                name="requiresAuth"
              />
              <ErrorMessage name="requiresAuth" component="div" className="text-red-500 text-xs mt-1" />

            </div>
            <label className={labelStyles} htmlFor="tags">
              Tags (Select from sub-category and/or enter custom tags, separated by commas)
            </label>
            <div className="flex items-center flex-col">
              <Field
                as="textarea"
                name="tags"
                className="shadow appearance-none border border-slate-600 bg-zinc-900 rounded w-full h-40 py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter tags..."
                value={values?.tags?.join(', ')} // Join array for display in textarea
                onChange={(e) => setFieldValue('tags', e.target.value.split(',').map((tag) => tag.trim()))}
              />
              {values?.category && <Field
                as="select"
                multiple
                className={`mr-2 ${fieldStyles} custom-scrollbar`}
                name="tags"
                onChange={(e) => {
                  const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                  const newTags = values.tags.concat(selectedOptions.filter((tag) => !values.tags.includes(tag)));
                  setFieldValue('tags', newTags);
                }}
              >
                {values?.category && categories.find((c) => c.name === values.category)?.subCategories?.map((tag) => (
                  <option key={tag.slug} value={tag.name}>
                    {tag.name}
                  </option>
                ))}
              </Field>}
              <ErrorMessage name="tags" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <label className={labelStyles} htmlFor="keywords">
              Keywords (Select from sub-category and/or enter custom keywords, separated by commas)
            </label>
            <div className="flex items-center flex-col">
              <Field
                as="textarea"
                name="keywords"
                className="shadow appearance-none border border-slate-600 bg-zinc-900 rounded w-full h-40 py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter keywords..."
                value={values?.keywords?.join(', ')} // Join array for display in textarea
                onChange={(e) => setFieldValue('keywords', e.target.value.split(',').map((keyword) => keyword.trim()))}
              />
              {values?.category && <Field
                as="select"
                multiple
                className={`mr-2 ${fieldStyles} custom-scrollbar`}
                name="keywords"
                onChange={(e) => {
                  const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                  const newkeywords = values.keywords.concat(selectedOptions.filter((keyword) => !values.keywords.includes(keyword)));
                  setFieldValue('keywords', newkeywords);
                }}
              >
                {values?.category && categories.find((c) => c.name === values.category)?.subCategories?.map((keyword) => (
                  <option key={keyword.slug} value={keyword.name}>
                    {keyword.name}
                  </option>
                ))}
              </Field>}
              <ErrorMessage name="keywords" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <label className={labelStyles} htmlFor="content">
              Content
            </label>
            <Field name="content">{({ field, form, meta }) => <TextEditor
              code={field.value}
              setFieldValue={setFieldValue}
            />}</Field>

            <br />
            <br />
            <br />
            <br />
            <div className=' py-6'>
              {submissionStatus === 'loading' && <p className="text-gray-700 text-sm font-bold mt-4">Submitting...</p>}
              {submissionStatus === 'success' && <p className="text-green-500 text-sm font-bold mt-4">Submission successful!</p>}
              {submissionStatus === 'error' && <p className="text-red-500 text-sm font-bold mt-4">Submission failed. Please try again.</p>}

            </div>

            <button
              className=" bg-tomato text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
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