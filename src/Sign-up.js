import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './App.css'

export default function Signup() {

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const [reEnterPassword, setReEnterPassword] = useState("");
    const [reEnterPasswordError, setReEnterPasswordError] = useState("");
    const [passwordNotMatchError, setPasswordNotMatchError] = useState(false);


    const handleNameChange = (e) => {
        setNameError("");
        setName(e.target.value);
    }


    const handleEmailChange = (e) => {
        setEmailError("");
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPasswordError("");
        setPassword(e.target.value);
    }


    const handleReEnterPasswordChange = (e) => {
        setReEnterPasswordError("");
        setReEnterPassword(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (name === "" || email === "" || password === "" || reEnterPassword === "" || password !== reEnterPassword) {
            //checking if name is empty
            if (name === '') {
                setNameError('Name Required');
            }
            //checking if email is empty
            if (email === '') {
                setEmailError('Email Required');
            }
            //checking is password is empty
            if (password === '') {
                setPasswordError('Password Required');
            }
            //checking is reEnterPassword is empty
            if (reEnterPassword === '') {
                setReEnterPasswordError('Password Required');
            }
            if (password !== reEnterPassword) {
                setPasswordNotMatchError("Password Do Not Match")
            }
        }
        else {
            setPasswordNotMatchError(false)

            let allUsers = []
            if (localStorage.getItem("allUsers")) {
                allUsers = JSON.parse(localStorage.getItem("allUsers"))
            }
            let oldUser
            oldUser = allUsers.filter((e) => e.email === email)
            if (oldUser.length === 0) {
                allUsers.push({
                    name,
                    email,
                    password
                })
                localStorage.setItem("allUsers", JSON.stringify(allUsers))
                setEmail("")
                setPassword("")
                setReEnterPassword("")
            }
            else {
                alert("User Already Exist")
            }
        }
        //check some other condition
        const emailRegax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailRegax.test(email)){
            setEmailError('');
        } else {
            setEmailError('Invalid Email');
        }
    }


    return (
        <div>
            <h1 className='heading'>Sign Up</h1>
            <form className='form-group form' autoComplete='off'
                onSubmit={handleFormSubmit}
            >
                <input className='email custom-input' type="text" placeholder='Enter Name'
                    onChange={handleNameChange} value={name} />
                {nameError && <div className='error-msg'>{nameError}</div>}

                <input className='email custom-input' type="email" placeholder='Enter Email'
                    onChange={handleEmailChange} value={email} />
                {emailError && <div className='error-msg'>{emailError}</div>}

                <input className='password custom-input' type="password" placeholder='Enter Password'
                    onChange={handlePasswordChange} value={password} />
                {passwordError && <div className='error-msg'>{passwordError}</div>}

                <input className='password custom-input' type="password" placeholder='Re-enter Password'
                    onChange={handleReEnterPasswordChange} value={reEnterPassword} />
                {reEnterPasswordError && <div className='error-msg'>{reEnterPasswordError}</div>}
                {passwordNotMatchError && <div className='error-msg pt-1'>{passwordNotMatchError}</div>}

                <button type='submit' className='submit' onClick={handleFormSubmit}>SIGN UP</button>
                <p className='already-msg'>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    )
}
