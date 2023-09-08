import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png';
import { Toaster, toast } from 'react-hot-toast';
import styles from '../styles/Username.module.css';
import { Formik, Form } from "formik";
import CustomFormikInput from '../hooks/customFormikInput.hook.js';
import { validatingForm } from '../helper/validate';
import { LoginApi } from '../helper/helper';
import { useAuth } from '../contexts/AuthContext';
import { FormHeader, LoadingOverlay } from '../components/index';

const SignIn = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const initialValues = {
        username: '',
        password: ''
    };
    const validateForm = validatingForm('username', 'password');
    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(true);
        const { username, password } = values;

        try {
            const loginPromise = await LoginApi('auth/login', {
                email_id: username, password: password
            });
            if (loginPromise.error) {
                toast.error(loginPromise.error)
                toast.error("Login Failed!")
            } else if (loginPromise.status === 200) {
                toast.success("Login Successfully!")
                const { data } = loginPromise.data
                const authToken = data.token;
                localStorage.setItem('authToken', authToken); // Store the token in local storage
                localStorage.setItem('user_type', data.user_type); // Store the token in local storage
                localStorage.setItem('profile_img_path', data.profile_img_path);
                navigate("/");
                setUser({ "userType": data.user_type, "authToken": authToken, "profile_img_path":data.profile_img || "NA" });

            } else {
            }
        } catch (error) {
            toast.error("Something Went Wrong!");
        } finally {
            actions.setSubmitting(false);
        }
    };

    return (
        <main>
            <div className="container mx-auto">

                <Toaster position='top-center' reverseOrder={false}></Toaster>

                <div className='flex justify-center items-center h-screen'>
                    <div className={styles.glass}>
                        <FormHeader />
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validateForm}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form className="">
                                    <div className='profile flex justify-center py-4'>
                                        <img src={avatar} className={styles.profile_img} alt="avatar" />
                                    </div>

                                    <div className="textbox flex flex-col items-center gap-6">
                                        <CustomFormikInput label={"User Name"} name={"username"} type={"email"} />
                                        <CustomFormikInput label={"Password"} name={"password"} type={"password"} />
                                        <button className={styles.btn} type='submit'>Sign In</button>
                                    </div>

                                    <div className="text-center py-4">
                                        <span className='text-gray-500'>Click here for <Link className='text-red-500' to="/forgetPassword">forget password</Link></span>
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

export default SignIn
