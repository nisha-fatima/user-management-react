import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './App.css'



export default function Home() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

    const deleteUser = () => {
       localStorage.removeItem("user")
       setUser(false)
    }

    return (
        <>
        {
            user ?
            <div className='profile'>
                <h4>NAME: {user.name}</h4>
                <h4>EMAIL: {user.email}</h4>
                <button onClick={deleteUser} className='submit'>LOGOUT</button>

            </div>
            :
            <div className='container'>
                <h1 className='main-heading'>Welcome to Galaxy Page</h1>
                <button className='button'><Link to="/login">Log in</Link></button>         
                <br />
                <button className='button'><Link to="/signup">Sign up</Link></button>
        </div>
        }
       
        </>
    )
}
