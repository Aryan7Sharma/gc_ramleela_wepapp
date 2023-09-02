import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate'
import { useAuthStore } from '../store/store'

import styles from '../styles/Username.module.css';


  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);
  //const setUsername = "aryan";
  const formik = useFormik({
    initialValues : {
      username : '',
      password:''
    },
    validate : usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      setUsername(values.username);
      navigate('/password')
    }


const SignInForm = () => {
  return (
    <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                  <img src={avatar} className={styles.profile_img} alt="avatar" />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username' />
                  {/* <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='Password' /> */}
                  <button className={styles.btn} type='submit'>Let's Go</button>
              </div>
              
              <div className="text-center py-4">
                <span className='text-gray-500'>Not a Member <Link className='text-red-500' to="/register">forget password</Link></span>
              </div>

          </form>
  )
}

export default SignInForm
