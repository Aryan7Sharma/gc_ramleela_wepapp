import { useState, useEffect } from 'react'
import avatar from '../assets/profile.png';
import {toast,  Toaster } from 'react-hot-toast';
import { Formik, Form } from 'formik';
import CustomFormikInput from '../hooks/customFormikInput.hook.js';
import { profileValidation } from '../helper/validate';
import {convertToBase64} from '../helper/convert';
import { validatingForm } from '../helper/validate';
import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css'
import { CustomGetApi, CustomPostApi } from '../helper/helper';
export default function Profile() {

  const [file, setFile] = useState();
  const [userDeatils, setUserDetails] = useState({
    name:'',
    email_id:'',
    phone_no:'',
    creation_date:'',
    address:''
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
    const {name,address} = values;
    console.log("values of profile", values,name,address);
    try {
      const responce = await CustomPostApi('collector/updateprofile', {
          name: name, address: address
      });
      if(responce.error) {
          toast.error("Updation Failed!")
      }else if(responce.status===200){
          toast.success("Details Updated Successfully!")
      }else {
      }
  } catch (error) {
      console.error(error);
      toast.error(error.message)
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
        console.log("data", data);
        setUserDetails(data);
        console.log("userDetails", userDeatils);
      } else {
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message)
    }
  }
  useEffect(() => {
    getUserDetails();
  }, [])
  const glassCss = window.innerWidth > 640 ? `${styles.glass} ${extend.glass}` : '';
  return (
    <section className='mb-10'>
      <div className="container mx-auto ">

        <Toaster position='top-center' reverseOrder={false}></Toaster>

        <div className='flex justify-center items-center h-screen'>
          <div className={glassCss}>

            <div className="title flex flex-col items-center">
              <h4 className='text-5xl font-bold'>Profile</h4>
              <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                You can update the details.
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
                    <img src={userDeatils?.profile || file || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
                  </label>

                  <input onChange={onUpload} type="file" id='profile' name='profile' />
                </div>

                <div className="textbox flex flex-col items-center gap-2">
                  <div className="name flex w-3/4 gap-10">
                    <CustomFormikInput label={"Name*"} name={"name"} type={"name"} style={`${styles.textbox} ${extend.textbox} `} placeholder={"Name"}/>
                    <CustomFormikInput label={"Registraction Date*"} name={"creation_date"} type={"datetime"} style={`${styles.textbox} ${extend.textbox}` } disabled={true}  placeholder={"Registraction Date"} />
                  </div>

                  <div className="name flex w-3/4 gap-10">
                    <CustomFormikInput label={"Mail Id*"} name={"email_id"} type={"email"} style={`${styles.textbox} ${extend.textbox}`} disabled={true} placeholder={"Email ID"} />
                    <CustomFormikInput label={"Phone No*"} name={"phone_no"} type={"mobile"} style={`${styles.textbox} ${extend.textbox}`} disabled={true} placeholder={"Phone No"} />
                  </div>


                    <CustomFormikInput  label={"Address*"} name={"address"} type={"text"} style={`${styles.textbox} ${extend.textbox} w-70`} placeholder={"Address"}/>
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
    </section>
  )
}

