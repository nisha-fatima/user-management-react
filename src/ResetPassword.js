import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router';

export default function ResetPassword() {

    const navigate = useNavigate();

    const [currentpassword, setCurrentPassword] = useState("")
    const [currentPasswordError, setCurrentPasswordError] = useState(false)

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const [repeatpassword, setRepeatPassword] = useState("")
    const [repeatpasswordError, setRepeatPasswordError] = useState(false)

    const [passwordNotMatchError, setPasswordNotMatchError] = useState(false);

    const [successMsg, setSuccessMsg] = useState("")


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

    const handleCurrentPasswordChange = (e) => {
        setCurrentPasswordError("");
        setCurrentPassword(e.target.value);
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
            let oldUser = allUsers.filter(e => e.password === currentpassword)
            if(oldUser.length !== 0) {
                let oldUserIndex = allUsers.findIndex(e => e.password === currentpassword)

                allUsers[oldUserIndex].password = password
    
                localStorage.setItem("allUsers", JSON.stringify(allUsers))
    
                setSuccessMsg("password change Successfull")
                setRepeatPassword("")
                setPassword("")
                setCurrentPassword("")
                setCurrentPasswordError("")
                setPasswordNotMatchError("")
                setTimeout(() => {
                    navigate("/")
                }, 1000);
            }
            else{
                setCurrentPasswordError("current password is wrong")
            }

        }
    }

    return (
        <div>
            <div>
                <h1 className='heading'>Reset Password</h1>
                <form className='form-group form' autoComplete='off'
                    onSubmit={handlePasswordSubmit}>
                    {successMsg && <>
                        <div className='success-msg'>{successMsg}</div>
                        <br></br>
                    </>}

                    <input className='password custom-input' type="password" placeholder='Current Password'
                        onChange={handleCurrentPasswordChange} value={currentpassword} />
                    {currentPasswordError && <div className='error-msg'>{currentPasswordError}</div>}

                    <input className='password custom-input' type="password" placeholder='New Password'
                        onChange={handlePasswordChange} value={password} />
                    {passwordError && <div className='error-msg'>{passwordError}</div>}

                    <input className='password custom-input' type="password" placeholder='Re-enter Password'
                        onChange={handleRepeatPasswordChange} value={repeatpassword} />
                    {repeatpasswordError && <div className='error-msg'>{repeatpasswordError}</div>}
                    {passwordNotMatchError && <>
                        <div className='error-msg'>{passwordNotMatchError}</div>
                        <br></br>
                    </>}

                    <button type='submit' className='submit'>SUBMIT</button>


                </form>
            </div>
        </div>
    )
}
