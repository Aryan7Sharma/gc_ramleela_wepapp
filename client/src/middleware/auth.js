
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import {AuthContext} from '../contexts/AuthContext';


// export const AuthorizeUser = ({ children }) => {
//     const token = localStorage.getItem('token');

//     if(!token){
//         return <Navigate to={'/'} replace={true}></Navigate>
//     }

//     return children;
// }


// export const ProtectRoute = ({ children }) => {
//     const username = useAuthStore.getState().auth.username;
//     if(!username){
//         return <Navigate to={'/'} replace={true}></Navigate>
//     }
//     return children;
// }

export const IsUserLoggedIN = ({ children }) => {
    const { user } = useContext(AuthContext);
    if(user){
        return <Navigate to={'/'} replace={true}></Navigate>;
    }
    return children
}

export const ProtectAllUserRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if(user){
        if(user.userType === "1" || user.userType === "0"){return children}
    }
    return <Navigate to={'/signin'} replace={true}></Navigate>;
}

export const ProtectCollectorRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if(user){
        if(user.userType === "1"){return children}
    }
    return <Navigate to={'/signin'} replace={true}></Navigate>;
}
export const ProtectAdminRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if(user){
        if(user.userType === "0"){return children}
    }
    return <Navigate to={'/signin'} replace={true}></Navigate>;
}