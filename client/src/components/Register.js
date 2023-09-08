import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png';
import { Toaster, toast } from 'react-hot-toast';
import { useFormik, Formik, Form } from 'formik';
import CustomFormikInput from '../hooks/customFormikInput.hook.js';
import { validatingForm } from '../helper/validate';
import { registerValidation } from '../helper/validate';
import { convertToBase64 } from '../helper/convert';
import { CustomPostApi } from '../helper/helper';


import styles from '../styles/Username.module.css';
import { Navbar, Footer } from "./index"
export default function Register() {
  const [file, setFile] = useState();
  const [userDeatils, setUserDetails] = useState({
    name: '',
    email_id: '',
    phone_no: '',
    password: '',
    flat_no: '',
    block_no: '',
    society_name: '',
    city_name: '',
    image: 'NA',
  });
  const validateForm = validatingForm("name", "email_id", "phone_no", "password", "flat_no", "block_no", "society_name", "city_name");
  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    const userData = values;
    const formData = new FormData();
    try {
      // Append form fields to FormData
      formData.append('name', values.name);
      formData.append('email_id', values.email_id);
      formData.append('phone_no', values.phone_no);
      formData.append('password', values.password);
      formData.append('flat_no', values.flat_no);
      formData.append('block_no', values.block_no);
      formData.append('society_name', values.society_name);
      formData.append('city_name', values.city_name);

      // Append the image to FormData
      formData.append('image', values.image);

      const responce = await CustomPostApi('admin/register', userData, 'multipart/form-data');
      if (responce.error) {
        toast.error("New Collector Registraction Failed!")
      } else if (responce.status === 201) {
        toast.success("New Collector Created Successfully!")
        //actions.resetForm();
      } else {
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    } finally {
      actions.setSubmitting(false);
    }
  }


  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async (e, values) => {
    const base64 = await convertToBase64(e.target.files[0]);
    values.image = e.target.files[0];
    setFile(base64);
  }

  return (
    <main>
      {/* <Navbar /> */}
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="container mx-auto w-50">

        {/* h-screen */}
        <div className='flex justify-center my-10'>
          <div className={`${styles.glass}pt-3 bg-customOrange`}>


            <div className="title flex flex-col items-center">
              <h4 className='text-5xl font-bold'>Register</h4>
              <span className='py-4 text-m w-2/5 sm:w-2/3 text-center text-gray-500'>
                हम श्री राम लीला उत्सव 2023 में स्वयंसेवक के रूप में आपके साथ जुड़ना पसंद करेंगे!
              </span>
            </div>



            <Formik
              initialValues={userDeatils}
              validationSchema={validateForm}
              onSubmit={handleSubmit}
            //enableReinitialize={true}
            >
              {({ values, isSubmitting, status }) => (
                <Form className='py-1'>
                  <div className='profile flex justify-center py-4'>
                    <label htmlFor="profile">
                      <img src={file || avatar} className={styles.profile_img} alt="avatar" />
                    </label>

                    <input onChange={(e) => onUpload(e, values)} type="file" id='profile' name='profile' />
                  </div>

                  <div className="textbox flex flex-col items-center gap-6">
                    <div className="sm:flex w-3/4  sm:gap-10">
                      <CustomFormikInput label={null} name={"name"} type={"name"} style={styles.textbox} placeholder={"Name*"} />
                      <CustomFormikInput label={null} name={"email_id"} type={"email"} style={styles.textbox} placeholder={"Mail ID*"} />
                    </div>
                    <div className="sm:flex w-3/4 sm:gap-10">
                      <CustomFormikInput label={null} name={"phone_no"} type={"number"} style={styles.textbox} placeholder={"Phone No*"} />
                      <CustomFormikInput label={null} name={"password"} type={"password"} style={styles.textbox} placeholder={"Password*"} />
                    </div>
                    <div className="sm:flex w-3/4 sm:gap-10">
                      <CustomFormikInput label={null} name={"flat_no"} type={"text"} style={styles.textbox} placeholder={"Flat/House* No"} />
                      <CustomFormikInput label={null} name={"block_no"} type={"text"} style={styles.textbox} placeholder={"Block/Street* Name"} />
                    </div>
                    <div className="sm:flex w-3/4 sm:gap-10">
                      <CustomFormikInput label={null} name={"society_name"} type={"text"} style={styles.textbox} placeholder={"Society/Area* Name"} />
                      <CustomFormikInput label={null} name={"city_name"} type={"text"} style={styles.textbox} placeholder={"City Name*"} />
                    </div>
                    <button className={styles.btn} type='submit'>Register</button>
                  </div>

                  {/* <div className="text-center py-4">
                <span className='text-gray-500'>Already Register? <Link className='text-red-500' to="/">Login Now</Link></span>
              </div> */}

                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </main>
  )
}

