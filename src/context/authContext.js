import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [messageAppear, setMessageAppear] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // get logged in user info
    useEffect(() => {
        const userLoggedIn = localStorage.getItem("user");
        if (userLoggedIn) {
            setUser(JSON.parse(userLoggedIn));
            setIsLoggedIn(true);
        }else {
            setIsLoggedIn(false);
        }
    } , []);

    // set screen loading
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
    }, [setLoading]);

    // function to delete a post
    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setIsLoggedIn(false);
        localStorage.setItem('success', JSON.stringify('You are logged out successfully!'));
        window.location.href='/login';
    }

    return (
        <AuthContext.Provider value={{ 
            user, 
            isLoggedIn, 
            handleLogout, 
            posts, 
            setPosts, 
            error, 
            setError,
            messageAppear, 
            setMessageAppear,
            message, 
            setMessage,
            loading,
            setLoading 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };