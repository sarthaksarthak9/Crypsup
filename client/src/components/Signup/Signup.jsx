import React, { useState } from 'react'
import Axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import './signup.css'

const Signup = () => {
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [walletaddress, setwalletaddress] = useState('');

    const navigate = useNavigate();

    const handlesubmit = (e) =>{
        e.preventDefault();

        Axios.post('http://localhost:3000/auth/signup',{
            username,
            email,
            password,
            walletaddress,
        }).then(response =>{
            if(response.data.status){
            navigate('/login')
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className='sign-up-container'>
            <h2>User Signup</h2>
            <form className='sign-up-form' onSubmit={handlesubmit}>
                <label htmlFor="username">username:</label>
                <input type="text" placeholder='username' onChange={(e) => setusername(e.target.value)} />

                <label htmlFor="email">Email:</label>
                <input type="email" placeholder='email' onChange={(e) => setemail(e.target.value)} />

                <label htmlFor="walletaddress">Wallet Address::</label>
                <input type="text" placeholder='Your Metamask Wallet Address' onChange={(e) => setwalletaddress(e.target.value)} />

                <label htmlFor="password">Password:</label>
                <input type="password" placeholder='password' onChange={(e) => setpassword(e.target.value)} />

                <button type='submit'>signup</button>
                <p>Have an account? <Link to='/login'>Login</Link></p>
            </form>
        </div>
    )
}

export default Signup
