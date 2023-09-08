import React from "react";
import { Formik, Form } from "formik";
import styles from '../styles/Username.module.css';
import { LoadingOverlay } from './index';
import CustomFormikInput from "../hooks/customFormikInput.hook";

const CustomForm = ({ initialValues, validationSchema, formikInput, formTitle, handleSubmit }) => {
    return (
        <div className='flex justify-center items-center my-10 mx-auto'>
            <div className={styles.glass}>

                <div className="title flex flex-col items-center">
                    <img
                        src="./WhatsApp Image 2023-08-11 at 4.21.35 PM.jpeg"
                        className="h-12 mr-3 sm:h-20 sm:w-80"
                        alt="Logo"
                    />
                    <span className='py-4 text-xl w-2/3 text-center text-gray-900'>
                        श्री राम लीला महोत्सव 2023
                    </span>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, status}) => (
                        <Form className="w-full max-w-sm p-6 bg-white rounded shadow-md mx-auto sm:max-w-lg ">
                            {formTitle && <h2 className="flex items-center justify-center">{formTitle}</h2>}
                            <hr className="mb-10"></hr>
                            {formikInput.map((item, i) => (
                                 <div key={i} className="textbox flex flex-col items-center gap-6">
                                <CustomFormikInput
                                    key={item}
                                    label={item.label + ":"}
                                    name={item.name}
                                    type={item.type}
                                    placeholder={"Enter " + item.label + " Here"}
                                    style={item.style?item.style:null}
                                />
                                </div>
                            ))}
                            {status? (
                                <LoadingOverlay />
                            ):<></>}
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    Submit
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default CustomForm;
