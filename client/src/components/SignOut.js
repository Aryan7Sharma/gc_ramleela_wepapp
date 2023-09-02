import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Toaster, toast } from 'react-hot-toast';
import { CustomPostApi } from '../helper/helper.js';
function SignOut() {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    const handleLogout = async () => {
        try {
            console.log("token logout", user.authToken, user);
            //const loginPromise = await CustomPostApi('auth/logout', {});
            // if(loginPromise.error) {
            //     //console.log(loginPromise.error);
            //     toast.error(loginPromise.error)
            //     //toast.error("SignOut Failed From Server Side!")
            // }
        } catch (error) {
            console.error(error);
            toast.error(error.message)
        }finally{
            toast.success("SignOut Successfully!")
            localStorage.removeItem("user_type");
            localStorage.removeItem("authToken");
            setUser(null);
            navigate("/signin")
        }
    };

    return (
        <div>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <button 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={handleLogout}>Logout</button>
        </div>
        
    );
}

export default SignOut;
