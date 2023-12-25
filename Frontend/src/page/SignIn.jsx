import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { userLoginRoute } from '../Utils/APIRoutes';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleAdminityChange = (event) => {
        // check if the value of the event.target is "admin then set the value to 1 else set the value to 0"
        if (event.target.value === "admin") {
            setIsAdmin(1);
        }
        else if (event.target.value === "citizen") {
            setIsAdmin(0);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('isAdmin?', isAdmin)
        try{
            const response = await axios.post(userLoginRoute, {
                email,
                password,
                isAdmin
            })
            const user = response.data.user;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('isAdmin', JSON.stringify(user.user.isAdmin))
            console.log(response.data.user)
            toast.success(response.data.message);
        } catch(error){
            console.log('Internal server error', error)
            toast.error("Incorrect username / password", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            })
        }
    };

    return (
        <>
        <ToastContainer position="bottom-right" theme="colored" />
        <div className="wrapper flex items-center justify-center">
            <div className="form-box mt-20">
                <form className="form" onSubmit={handleSubmit}>
                    <span className="title font-[Poppins] uppercase">Sign in</span>
                    <span className="subtitle">Login to your account with your registered email.</span>
                    <div className="form-container">
                        {/* <input
                            type="text"
                            className="input"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={handleFullNameChange}
                        /> */}
                        <input
                            type="email"
                            className="input"
                            placeholder="Email 📧"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <input
                            type="password"
                            className="input"
                            placeholder="Password 🔑"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <select className="input" style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }} onChange={handleAdminityChange}>
                            <option value="choose">Click to Choose ⬇️</option>
                            <option value="admin">Admin</option>
                            <option value="citizen">Citizen</option>
                        </select>
                    </div>
                    <button type="submit" onClick={handleSubmit}>Sign in</button>
                </form>
                <div className="form-section">
                    <p>Don't have an account? <Link to='/user/details'>Create One</Link> </p>
                </div>
            </div>
        </div>
        </>
    );
};

export default SignIn;
