import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Toaster, toast } from 'react-hot-toast';
import { CustomPostApi } from '../helper/helper.js';
function SignOut() {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    const handleLogout = async () => {
        try {
            
        } catch (error) {
            toast.error("Something Went Wrong!");
        }finally{
            toast.success("SignOut Successfully!")
            localStorage.clear();
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
