import React, { useState } from 'react'
import Axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const Forgotpassword = () => {
    const [email, setemail] = useState('');

    const navigate = useNavigate();

    const handlesubmit = (e) =>{
        e.preventDefault();

        Axios.post('http://localhost:3000/auth/forgotpassword',{
            email,
        }).then(response =>{
            if(response.data.status){
                alert('check your email for reset password link');
            navigate('/login')
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className='sign-up-container'>
            <h2>Forgot Password</h2>
            <form className='sign-up-form' onSubmit={handlesubmit}>

                <label htmlFor="email">Email:</label>
                <input type="email" placeholder='email' onChange={(e) => setemail(e.target.value)} />

                <button type='submit'>Send</button>
            </form>
        </div>
    )
}

export default Forgotpassword
