'use client'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';
import Image from 'next/image'
import { useFormikContext } from 'formik';

export const Dropzone = ({ values }) => {
    const formik = useFormikContext();
    const [base64String, setBase64String] = useState('');

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const base64Result = e.target.result;
                setBase64String(base64Result);
            };

            reader.readAsDataURL(file);
        }
    };


    
    const deleteCloudImg = async () => {
        setShowLoaderOverlay(true)
        if (!!values.image_id) {
            await deleteCloudinaryImg(values.image_id);
            formik.setValues({
                ...formik.values,
                image: '',
            });
        }

        setBase64String('')
    }
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop,
    });

    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-center bg-zinc-800 h-40 cursor-pointer' {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop an image here, or click to select an image</p>
            </div>
            {!!base64String &&
                <>
                    <Image
                        className="rounded w-auto h-auto"
                        src={base64String}
                        alt={`Article image`}
                        width={200}
                        height={200}
                        priority
                        as="image"
                    />

                    <div className='flex justify-between items-center'>
                        {!values.image && <button type='button' onClick={upload} className='text-xl bg-gray-800 py-3 my-4 w-fit px-6 rounded-md mx-auto' aria-label='Upload image'>
                            Upload image
                        </button>
                        }
                        <button type='button' onClick={deleteCloudImg} className='text-xl bg-red-200 py-3 my-4 w-fit px-6 rounded-md mx-auto' aria-label='Delete image'>
                            Delete image
                        </button>
                    </div>
                </>
            }

        </div>
    );
};