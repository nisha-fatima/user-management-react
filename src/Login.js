import React, { useState, useEffect } from 'react';
import './App.css';
import {useNavigate} from 'react-router';
import { Link } from 'react-router-dom'


export default function Login() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [successMsg, setSuccessMsg] = useState("")
    const navigate = useNavigate()

    const handleEmailChange = (e) => {
        setSuccessMsg("");
        setEmailError("");
        setEmail(e.target.value);
    }


    const handlePasswordChange = (e) => {
        setSuccessMsg("");
        setPasswordError("");
        setPassword(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const emailRegax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!emailRegax.test(email)) {
            setEmailError('Invallid Email');
        }
        else if(password === "") {
            setPasswordError('Invalid Password');
        }
        else {
            let allUsers = []
            if (localStorage.getItem("allUsers")) {
                allUsers = JSON.parse(localStorage.getItem("allUsers"))
            }
            let oldUser = []
            oldUser = allUsers.filter((e) => e.email === email)
        
            if (oldUser.length !== 0) {
                let user = oldUser.filter((e) => e.password === password)
                if (user.length !== 0) {
                    localStorage.setItem("user", JSON.stringify(user[0]))
                    setSuccessMsg("Login Successfull")
                    setEmail("")
                    setPassword("")
                    setTimeout(() => {
                        navigate("/")
                    }, 1000);
                } else {
                    alert("password not match")
                }
            }
            else {
                alert("User not Exist")
            }
        }
    }

    useEffect(() => {
        if(localStorage.getItem("user")){
            navigate('/');
        }
    }, [])

return (
    <div>
        <h1 className='heading'>Login</h1>
        <form className='form-group form' autoComplete='off'
            onSubmit={handleFormSubmit}>
            {successMsg && <>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>}
            <input className='email custom-input' type="email" placeholder='Enter Email'
                onChange={handleEmailChange} value={email} />
            {emailError && <div className='error-msg'>{emailError}</div>}

            <input className='password custom-input' type="password" placeholder='Enter Password'
                onChange={handlePasswordChange} value={password} />
            {passwordError && <div className='error-msg'>{passwordError}</div>}

            <button type='submit' className='submit'>LOGIN</button>
            <p className='already-msg'>Don't have an account? <Link to="/signup">Signup</Link></p>
            <p className='already-msg'>Forgot Password? <Link to="/forgot-password">Click here</Link></p>

        </form>
    </div>

);
}


