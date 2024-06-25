import React, { useState } from 'react'
import Axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';

const Resetpassword = () => {
    const [password, setpassword] = useState('');

    const {token} = useParams(); 

    const navigate = useNavigate();

    const handlesubmit = (e) =>{
        e.preventDefault();

        Axios.post('http://localhost:3000/auth/resetpassword/'+token,{
            password,
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
            <h2>Reset Password</h2>
            <form className='sign-up-form' onSubmit={handlesubmit}>

            <label htmlFor="password">New Password:</label>
                <input type="password" placeholder='password' onChange={(e) => setpassword(e.target.value)} />

                <button type='submit'>Reset</button>
            </form>
        </div>
    )
}

export default Resetpassword
