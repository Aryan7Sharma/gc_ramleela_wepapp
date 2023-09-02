import { Toaster, toast } from 'react-hot-toast';
import { validatingForm } from '../helper/validate';
import { CustomPostApi } from '../helper/helper';
import { Navbar, Footer, CustomForm } from '../components';
const ContactUs = () => {
    const formTitle = "Write you Query Here.";
    const formikInput = [
        { "label": "Name", "name": "name", "type": "text" },
        { "label": "Email", "name": "email", "type": "email" },
        { "label": "Message", "name": "message", "type": "message", "style":"h-16" },
    ];
    const initialValues = {
        name: '',
        email: '',
        message: ''
    }
    const validationSchema = validatingForm('name', 'email', 'message');
    const handleSubmit = async (values, actions) => {
        try {
            actions.setSubmitting(true);
            actions.setStatus(true);
            console.log(values)
            //const responce = await CustomPostApi('auth/changePassword',values);
            toast.success("We got your message we try to respond you ASAP.")
            const responce = 200;
            return ;
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

export default ContactUs
