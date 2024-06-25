import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './supporterdashboard.css'

const supporterdashboard = () => {

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handlelogout = () => {
    axios.get('http://localhost:3000/auth/logout')
      .then(res => {
        if (res.data.status) {
          navigate('/')
        }
      }).catch(err => {
        console.log(err);
      })
  }

  return (
    <>
      <div className="homesection">
        <section className="header">
          <div className='logo'>
            <img src="/assets/crypsup.png" alt="" />
            <div className='headerheading'>CrypSup</div>
          </div>
          <div>
            <Link to='/supporterdashboard'>Home</Link>
          </div>
          <div>
            <Link to='/explorepage'>Explore</Link>
          </div>
          <div>
            <a href='#about'>About</a>
          </div>
          <div className='connectwallet'>
            <a href='http://localhost:1234' target='_blank'>CONNECT YOUR WALLET</a>
          </div>
          <div>
            <button onClick={handlelogout} className='logoutbuttonsupporter'>LOGOUT</button>
          </div>
        </section>  
        <section className='homepagesupporter'>
          <img src="https://imgs.search.brave.com/MHL6ym9grJJe8E_YnKt0cZ588B3TbRIYo0nnCplOhYY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ4/NjkxMDA1Ni9waG90/by9oYW5kLWdpdmlu/Zy1oZWFydC1sb3Zl/LWhlbHAtc3VwcG9y/dC1raW5kbmVzcy53/ZWJwP2I9MSZzPTE3/MDY2N2Emdz0wJms9/MjAmYz11LTlya1dF/bnB3cl9GczFGODB3/cXNUR1ZTTVE0RUM1/QlRyQzJyTS1nbEpB/PQ" alt="" />
        </section>
      </div>
    </>
  )
}

export default supporterdashboard
