import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;

export const AuthProvider = ({children}) => {
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loginUser = async (username, password) => {
        const response = await fetch(`${baseURL}/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({ 'username': username, 'password': password })
        });

        const data = await response.json();
        if(response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            const { user_id } = jwt_decode(data.access)
            if(user_id !== 1) {
                navigate("/");
            } else {
                navigate("/dashboard");
            }
        } else {
            alert('You have entered an invalid username or password. Please try again')
        }
    }

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate("/login");
    }

    // const updateToken = async () => {
    //     console.log('adsdasd')
    //     const response = await fetch('https://web-production-94d8.up.railway.app/token/refresh/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body:JSON.stringify({ 'refresh': authTokens?.refresh })
    //     });
    //     const data = await response.json();

    //     if(response.status === 200) {
    //         setAuthTokens(data);
    //         setUser(jwt_decode(data.access));
    //         localStorage.setItem('authTokens', JSON.stringify(data));
    //         navigate("/");
    //     } else {
    //         logoutUser();
    //     }

    //     if(loading) {
    //         setLoading(false);
    //     }
    // }

    const changePassword = async (password) => {
        const response = await fetch(`${baseURL}/change-password/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authTokens?.access}`
            },
            body:JSON.stringify({ 'password': password })
        });

        const {is_change_password} = await response.json();
        if(is_change_password) {
            navigate("/");
        }
    }

    const createUser = async (payload) => {
        // console.log(payload)
        // const response = await axios({
        //     method: 'post',
        //     url: `${baseURL}/createUser/`,
        //     data: payload,
        // });

        // console.log(response)


        const response = await fetch(`${baseURL}/createUser/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(payload)
        });

        const data = await response.json();
        if (data) {
            return { success: true }
        } else {
            return { success: false }
        }
    }

    const contextData = {
        user: user,
        authTokens:authTokens,
        setUser: setUser,
        setAuthTokens: setAuthTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        changePassword: changePassword,
        createUser: createUser
    }

    useEffect(() => {
        if(authTokens) {
            setUser(jwt_decode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}