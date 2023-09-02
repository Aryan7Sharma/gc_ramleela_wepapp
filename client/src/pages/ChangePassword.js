import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { validatingForm } from '../helper/validate';
import { CustomPostApi } from '../helper/helper';
import { Navbar, Footer, CustomForm } from '../components';
const ChangePassword = () => {
    const formTitle = "Change Password";
    const formikInput = [
        { "label": "Old Password", "name": "old_password", "type": "password" },
        { "label": "New Password", "name": "new_password", "type": "password" },
        { "label": "Confirm New Password", "name": "confirm_new_password", "type": "password" },
    ];
    const initialValues = {
        old_password: '',
        new_password: '',
        confirm_new_password: ''
    }
    const validationSchema = validatingForm('old_password', 'new_password', 'confirm_new_password');
    const handleSubmit = async (values, actions) => {
        try {
            actions.setSubmitting(true);
            actions.setStatus(true);
            console.log(values)
            const responce = await CustomPostApi('auth/changePassword',values);
            console.log(responce);
            if (responce.status === 200) {
                toast.success("Password Changed Successfully.")
            } else if (responce.error) {
                console.log(responce.error)
                toast.error(responce.error);
                toast.error("Failed to Change Password");
            }
        }catch(error){
            console.error(error);
        }finally{
            actions.resetForm();
            actions.setSubmitting(false);
            actions.setStatus(false);
        }

    }
    return (
        <main>
            <Navbar />
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <CustomForm initialValues={initialValues} validationSchema={validationSchema} formikInput={formikInput} formTitle={formTitle} handleSubmit={handleSubmit} />
            <Footer />
        </main>
    )
}

export default ChangePassword
