import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png';
import { Toaster, toast } from 'react-hot-toast';
import { useFormik, Formik, Form} from 'formik';
import CustomFormikInput from '../hooks/customFormikInput.hook.js';
import { validatingForm } from '../helper/validate';
import { registerValidation } from '../helper/validate';
import {convertToBase64} from '../helper/convert';
import { CustomPostApi } from '../helper/helper';


import styles from '../styles/Username.module.css';
import {Navbar,Footer} from "./index"
export default function Register() {
  const [file, setFile] = useState()
  const [userDeatils, setUserDetails] = useState({
    name:'',
    email_id:'',
    phone_no:'',
    password:'',
    block_no:'',
    society_name:'',
    address:''
  });
  const validateForm = validatingForm("name", "email_id", "phone_no", "password", "block_no", "society_name", "address");
  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    const userData = values; 
    try {
      const responce = await CustomPostApi('admin/register', userData);
      if(responce.error) {
          toast.error("New Collector Registraction Failed!")
      }else if(responce.status===201){
          toast.success("New Collector Created Successfully!")
          //actions.resetForm();
      }else {
      }
  } catch (error) {
      console.error(error);
      toast.error(error.message)
  } finally {
    actions.setSubmitting(false);
  }
}


  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  return (
    <main>
    <Navbar />
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>
      {/* h-screen */}
      <div className='flex justify-center items-center '>
        <div className={styles.glass} style={{ width: "45%", paddingTop: '3em'}}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Register</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                हम श्री राम लीला उत्सव 2023 में स्वयंसेवक के रूप में आपके साथ जुड़ना पसंद करेंगे!
            </span>
          </div>

          <Formik
              initialValues={userDeatils}
              validationSchema={validateForm}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
          <Form className='py-1'>
              <div className='profile flex justify-center py-4'>
                  <label htmlFor="profile">
                    <img src={file || avatar} className={styles.profile_img} alt="avatar" />
                  </label>
                  
                  <input onChange={onUpload} type="file" id='profile' name='profile' />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                <div className="sm:flex sm:w-3/4 sm:gap-10">
                  <CustomFormikInput label={null}  name={"name"} type={"name"} style={styles.textbox} placeholder={"Name*"}/>
                  <CustomFormikInput label={null} name={"email_id"} type={"email"} style={styles.textbox} placeholder={"Mail ID*"}/>
                </div>
                <div className="sm:flex sm:w-3/4 sm:gap-10">
                  <CustomFormikInput label={null} name={"phone_no"} type={"number"} style={styles.textbox} placeholder={"Phone No*"}/>
                  <CustomFormikInput label={null} name={"password"} type={"password"} style={styles.textbox} placeholder={"Password*"}/>
                </div>
                <div className="sm:flex sm:w-3/4 sm:gap-10">
                  <CustomFormikInput label={null} name={"block_no"} type={"text"} style={styles.textbox} placeholder={"Block/House* No"}/>
                  <CustomFormikInput label={null} name={"society_name"} type={"text"} style={styles.textbox} placeholder={"Society/Area* Name"}/>
                </div>
                <CustomFormikInput label={null} name={"address"} type={"text"} style={styles.textbox} placeholder={"Address*"}/>
                  <button className={styles.btn} type='submit'>Register</button>
              </div>

              {/* <div className="text-center py-4">
                <span className='text-gray-500'>Already Register? <Link className='text-red-500' to="/">Login Now</Link></span>
              </div> */}

          </Form>
          </Formik>
        </div>
      </div>
    </div>
    <Footer />
    </main>
  )
}

