import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Formik, Form, Field } from 'formik'
import CustomFormikInput from '../hooks/customFormikInput.hook.js';
import styles from '../styles/Username.module.css';
import { FormHeader } from './index.js';
const DonationReceipt = ({ validatingSchema, handleSubmit, formTitle, searchType, setSearchType }) => {
  const validateForm = validatingSchema(searchType);
  const handleSearchTypeChange = (searchType,values) => {
    try {
      searchType==="phoneno"?values.receipt_no='':values.phone_no='';
      if (searchType === "phoneno") {setSearchType("phone_no")} 
      else {setSearchType("receipt_no")}
    } catch (error) {
    }
  }
  return (
    <section>
      <div className="container mx-auto">

        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center '>
          <div className="w-45 pt-12">
            <FormHeader />
            <Formik
              initialValues={{ receipt_no: '', phone_no: '', receipt_search_type: 'phoneno' }}
              validationSchema={validateForm}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ values, isSubmitting, status}) => (
                <Form className='w-full max-w-sm p-6 bg-white rounded shadow-md mx-auto  my-20 sm:max-w-lg'>
                  {formTitle && <h2 className="flex items-center justify-center text-3xl">{formTitle}</h2>}
                  <hr className="mb-10"></hr>
                  <div className="textbox flex flex-col items-center gap-1">
                    <label className="block font-semibold mb-1">Receipt Search Type</label>
                    <div className="flex items-center space-x-2">
                      <label className="inline-flex items-center space-x-2">
                        <Field
                          type="radio"
                          name="receipt_search_type"
                          value="phoneno"
                          className="form-radio text-blue-500"
                          onClick={() => handleSearchTypeChange('phoneno', values)}
                        />
                        <span>Phone No</span>
                      </label>
                      <label className="inline-flex items-center space-x-2">
                        <Field
                          type="radio"
                          name="receipt_search_type"
                          value="receiptno"
                          className="form-radio text-pink-500"
                          onClick={() => handleSearchTypeChange('receiptno', values)}
                        />
                        <span>Receipt No</span>
                      </label>
                    </div>
                    <hr className="mb-5"></hr>
                    <CustomFormikInput label={"Phone No"} name={"phone_no"} type={"text"} placeholder={"Enter Phone No.*"} disabled={values.receipt_search_type === "receiptno"} />
                    <hr className="mb-5"></hr>
                    <CustomFormikInput label={"Receipt No"} name={"receipt_no"} type={"text"} placeholder={"Enter e+Year+Month+Receipt+No*"} disabled={values.receipt_search_type === "phoneno"} />
                    <button className={styles.btn} type='submit'>Generate Receipt</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DonationReceipt
