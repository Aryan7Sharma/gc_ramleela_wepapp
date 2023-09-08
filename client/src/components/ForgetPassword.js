import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { Formik, Form } from 'formik';
import CustomFormikInput from '../hooks/customFormikInput.hook.js';
import { validatingForm } from '../helper/validate';
import { CustomPostApi } from '../helper/helper';
import styles from '../styles/Username.module.css';
import {FormHeader, LoadingOverlay} from './index.js';

export default function ForgetPassword() {
    const navigate = useNavigate();
    const [userid, setUserId] = useState({ email_id: '' });
    const validateForm = validatingForm("email_id");
    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(true);
        const reqData = values;
        try {
            const responce = await CustomPostApi('auth/forgetpassword', reqData);
            if (responce.error) {
                toast.error("User Not Found!")
            } else if (responce.status === 200) {
                toast.success("New Password send it your Mail Id!")
                actions.resetForm();
                navigate('/signin');
            } else {
            }
        } catch (error) {
            toast.error(error)
        } finally {
            actions.setSubmitting(false);
        }
    }


    return (
        <main>
            <div className="container">

                <Toaster position='top-center' reverseOrder={false}></Toaster>
                {/* h-screen */}
                <div className='flex justify-center items-center h-screen'>
                    <div className={styles.glass} style={{ width: "30%", height:"50%", paddingTop: '3em', margin:'auto' }}>
                        <FormHeader />
                        <Formik
                            initialValues={userid}
                            validationSchema={validateForm}
                            onSubmit={handleSubmit}
                            enableReinitialize={true}
                        >
                            {({ isSubmitting}) => (
            
                            <Form className='py-1'>
                                <div className="textbox flex flex-col items-center gap-6">
                                    <CustomFormikInput label={"Mail ID"} name={"email_id"} type={"email"} placeholder={"Mail ID*"} />
                                    <button className={styles.btn} type='submit'>Send New Password</button>
                                </div>
                                {isSubmitting && <LoadingOverlay />}
                            </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </main>
    )
}

