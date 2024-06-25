import React, { useState } from 'react'
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signinsupporter = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const navigate = useNavigate();

    Axios.defaults.withCredentials = true;

    const handlesubmit = (e) => {
        e.preventDefault();

        Axios.post('http://localhost:3000/auth/supporterlogin', {
            email,
            password,
        }).then(response => {
            const { token } = response.data;
            localStorage.setItem('supportertoken', token);
            if (response.data.status) {
                navigate('/supporterdashboard')
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className='sign-up-container'>
            <h2>Supporter Login</h2>
            <form className='sign-up-form' onSubmit={handlesubmit}>

                <label htmlFor="email">Email:</label>
                <input type="email" placeholder='email' onChange={(e) => setemail(e.target.value)} />

                <label htmlFor="password">Password:</label>
                <input type="password" placeholder='password' onChange={(e) => setpassword(e.target.value)} />

                <button type='submit'>signup</button>

                {/* <div className='forgotpasswordbutton'>
                <Link to='/forgotpassword'>Forgot password</Link>
                </div> */}

                <p>Don't Have an account? <Link to='/supportersignup'>signup</Link></p>

            </form>
        </div>
    )
}

export default Signinsupporter;
