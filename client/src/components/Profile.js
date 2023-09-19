import { useState, useEffect } from 'react'
import avatar from '../assets/profile.png';
import { toast, Toaster } from 'react-hot-toast';
import { Formik, Form } from 'formik';
import CustomFormikInput from '../hooks/customFormikInput.hook.js';
import { convertToBase64 } from '../helper/convert';
import { validatingForm } from '../helper/validate';
import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css'
import { CustomGetApi, CustomPostApi } from '../helper/helper';
export default function Profile() {
  const profile_img_path = localStorage.getItem('profile_img_path');
  const url = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3001/api"
  const [file, setFile] = useState();
  const [userDeatils, setUserDetails] = useState({
    name: '',
    email_id: '',
    phone_no: '',
    creation_date: '',
    address: ''
  });
  //const { isLoading, apiData, serverError } = useFetch();
  const validateForm = validatingForm("name", "address");


  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(false);
    const { name, address } = values;
    try {
      const responce = await CustomPostApi('auth/updateprofile', {
        name: name
      });
      if (responce.error) {
        toast.error("Updation Failed!")
      } else if (responce.status === 200) {
        toast.success("Details Updated Successfully!")
      } else {
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  }
  const getUserDetails = async () => {
    try {
      const responce = await CustomGetApi('auth/userdetails', {});
      if (responce.error) {
        toast.error(responce.error)
        toast.error("Failed to Fetch Details From Server")
      } else if (responce.status === 200) {
        toast.success("Get Your Details Successfully.")
        const { data } = responce.data
        setUserDetails(data);
      } else {
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  }
  useEffect(() => {
    getUserDetails();
  }, [])
  const glassCss = window.innerWidth > 640 ? `${styles.glass} ${extend.glass}` : '';
  return (
    <section className='my-10'>
      <div className="container mx-auto ">

        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className="container mx-auto w-50">

          {/* h-screen */}
          <div className='flex justify-center my-10'>
            <div className={`${styles.glass}pt-3 bg-customOrange`}>
              <div className="title flex flex-col items-center">
                <h4 className='text-3xl sm:text-5xl font-bold'>Profile</h4>
                <span className='py-4 text-m w-2/5 sm:w-2/3 text-center text-gray-500'>
                  Here you can update your Name.
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
                      <img src={profile_img_path && profile_img_path !== "NA" ? `${url}/auth/images/profileimg/${profile_img_path}` : avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
                    </label>

                    <input onChange={onUpload} type="file" id='profile' name='profile' disabled={true} />
                  </div>

                  <div className="textbox flex flex-col items-center gap-2">
                    <div className="name sm:flex w-3/4 gap-10">
                      <CustomFormikInput label={"Name*"} name={"name"} type={"name"} style={`${styles.textbox} ${extend.textbox} `} placeholder={"Name"} />
                      <CustomFormikInput label={"Registraction Date*"} name={"creation_date"} type={"datetime"} style={`${styles.textbox} ${extend.textbox}`} disabled={true} placeholder={"Registraction Date"} />
                    </div>

                    <div className="name sm:flex w-3/4 gap-10">
                      <CustomFormikInput label={"Mail Id*"} name={"email_id"} type={"email"} style={`${styles.textbox} ${extend.textbox}`} disabled={true} placeholder={"Email ID"} />
                      <CustomFormikInput label={"Phone No*"} name={"phone_no"} type={"mobile"} style={`${styles.textbox} ${extend.textbox}`} disabled={true} placeholder={"Phone No"} />
                    </div>

                    <div className="name sm:flex w-3/4 gap-10">
                      <CustomFormikInput label={"Address*"} name={"address"} type={"text"} style={`${styles.textbox} ${extend.textbox} w-70`} disabled={true} placeholder={"Address"} />
                    </div>
                    <button className={styles.btn} type='submit'>Update</button>


                  </div>

                  {/* <div className="text-center py-4">
                  <span className='text-gray-500'>come back later? <button onClick={userLogout} className='text-red-500' to="/">Logout</button></span>
                </div> */}

                </Form>
              </Formik>

            </div>
          </div>
          </div>
        </div>
    </section>
  )
}

