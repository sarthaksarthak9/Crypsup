import React, { useState } from 'react'
import Axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';


const Signupsupporter = () => {
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const navigate = useNavigate();

    const handlesubmit = (e) =>{
        e.preventDefault();

        Axios.post('http://localhost:3000/auth/supportersignup',{
            username,
            email,
            password,
        }).then(response =>{
            if(response.data.status){
            navigate('/signinsupporter')
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className='sign-up-container'>
            <h2>Supporter Signup</h2>
            <form className='sign-up-form' onSubmit={handlesubmit}>
                <label htmlFor="username">username:</label>
                <input type="text" placeholder='username' onChange={(e) => setusername(e.target.value)} />

                <label htmlFor="email">Email:</label>
                <input type="email" placeholder='email' onChange={(e) => setemail(e.target.value)} />

                <label htmlFor="password">Password:</label>
                <input type="password" placeholder='password' onChange={(e) => setpassword(e.target.value)} />

                <button type='submit'>signup</button>
                <p>Have an account? <Link to='/signinsupporter'>Login</Link></p>
            </form>
        </div>
    )
}

export default Signupsupporter
