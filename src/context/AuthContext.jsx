import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loginUser = async (username, password) => {
        const response = await fetch('https://web-production-94d8.up.railway.app/token/', {
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

            // const res = await api.get('/user/')
            // console.log('res', res)
            navigate("/");
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

    const changePassword = async (password) => {
        const response = await fetch('https://web-production-94d8.up.railway.app/change-password/', {
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

    // const updateToken = async () => {
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

    const contextData = {
        user: user,
        authTokens:authTokens,
        setUser: setUser,
        setAuthTokens: setAuthTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        changePassword: changePassword
    }

    useEffect(() => {
        // ---- OLD ---
        // if(loading) {
        //     updateToken();
        // }

        // let time = 1000 * 60 * 4;
        // let interval = setInterval(() => {
        //     if(authTokens) {
        //         updateToken();
        //     }
        // }, time)
        
        // return () => clearInterval(interval)

        // --- NEW ---
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