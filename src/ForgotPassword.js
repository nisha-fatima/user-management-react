import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router';


export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const navigate = useNavigate();

    const [currentuser, setCurrentUser] = useState(false);

    const [shownameinput, setShowNameInput] = useState(false);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");

    const [showpasswordinput, setShowPasswordInput] = useState(false);
    const [password, setPassword] = useState("");
    const [repeatpassword, setRepeatPassword] = useState("")
    const [passwordError, setPasswordError] = useState(false);
    const [repeatpasswordError, setRepeatPasswordError] = useState(false)
    const [passwordNotMatchError, setPasswordNotMatchError] = useState(false);
    const [successMsg, setSuccessMsg] = useState("")


    const handleEmailChange = (e) => {
        setEmailError("");
        setEmail(e.target.value);
    }

    const handleNameChange = (e) => {
        setNameError("");
        setName(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPasswordNotMatchError("");
        setPasswordError("");
        setPassword(e.target.value);
    }

    const handleRepeatPasswordChange = (e) => {
        setPasswordNotMatchError("");
        setRepeatPasswordError("");
        setRepeatPassword(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const emailRegax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!emailRegax.test(email)) {
            setEmailError('Invallid Email');
        }
        else {
            let allUsers = []
            if (localStorage.getItem("allUsers")) {
                allUsers = JSON.parse(localStorage.getItem("allUsers"))
            }
            let oldUser = []
            oldUser = allUsers.filter((e) => e.email === email)

            if (oldUser.length !== 0) {
                setShowNameInput(true)
                setCurrentUser(oldUser[0])
            }

            else {
                alert("User not Exist")
            }
        }
    }


    const handleNameSubmit = (e) => {
        e.preventDefault();

        if (name === currentuser.name) {
            setShowPasswordInput(true)
        } else {
            alert("Wrong Name")
        }
    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === "" || repeatpassword === "" || password !== repeatpassword) {
            //checking is password is empty
            if (password === '') {
                setPasswordError('Password Required');
            }
            //checking is reEnterPassword is empty
            if (repeatpassword === '') {
                setRepeatPasswordError('Password Required');
            }
            if (password !== repeatpassword) {
                setPasswordNotMatchError("Password Do Not Match")
            }
        }
        else {
            let allUsers = JSON.parse(localStorage.getItem("allUsers"))
            let oldUserIndex = allUsers.findIndex(e => e.email === email)
            allUsers[oldUserIndex].password = password

            localStorage.setItem("allUsers", JSON.stringify(allUsers))

            setSuccessMsg("password change Successfull")
            setRepeatPassword("")
            setPassword("")
            setPasswordNotMatchError("")
            setTimeout(() => {
                navigate("/login")
            }, 1000);

        }
    }

    return (
        <div>{
            showpasswordinput ?
                <>
                    <h1 className='heading'>Enter Password</h1>
                    <form className='form-group form' autoComplete='off'
                        onSubmit={handlePasswordSubmit}>
                        {successMsg && <>
                            <div className='success-msg'>{successMsg}</div>
                            <br></br>
                        </>}
                        <input className='email custom-input' type="password" placeholder='Enter Password'
                            onChange={handlePasswordChange} value={password} />
                        {passwordError && <div className='error-msg'>{passwordError}</div>}

                        <input className='email custom-input' type="password" placeholder='Re-Enter Password'
                            onChange={handleRepeatPasswordChange} value={repeatpassword} />
                        {repeatpasswordError && <div className='error-msg'>{repeatpasswordError}</div>}
                        {passwordNotMatchError && <>
                            <div className='error-msg'>{passwordNotMatchError}</div>
                            <br></br>
                        </>}

                        <button type='submit' className='submit'>SUBMIT</button>

                    </form>
                </>
                :
                shownameinput ?
                    <>
                        <h1 className='heading'>Enter Your Name</h1>
                        <form className='form-group form' autoComplete='off'
                            onSubmit={handleNameSubmit}>
                            <input className='email custom-input' type="text" placeholder='Enter Name'
                                onChange={handleNameChange} value={name} />
                            {nameError && <div className='error-msg'>{nameError}</div>}

                            <button type='submit' className='submit'>SUBMIT</button>

                        </form>
                    </>

                    :
                    <>
                        <h1 className='heading'>Find Your Account</h1>
                        <form className='form-group form' autoComplete='off'
                            onSubmit={handleFormSubmit}>
                            <input className='email custom-input' type="email" placeholder='Enter Email'
                                onChange={handleEmailChange} value={email} />
                            {emailError && <div className='error-msg'>{emailError}</div>}

                            <button type='submit' className='submit'>SUBMIT</button>

                        </form>


                    </>

        }

        </div>

    );
}
