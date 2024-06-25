import { useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import './Explorepage.css';

import axios from 'axios';

const Explorepage = () => {

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3000/username/getallproject');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  return (
    <div className='supporterdashboard'>
      <div className="exploreheader">
        <div className='logo'>
          <img src="/assets/crypsup.png" alt="" />
          <div className='headerheading'>CRYPSUP</div>
        </div>
        <div className="exploreheading">MEET YOUR CREATORS?</div>
        <div className='goback'>
          <Link to='/supporterdashboard'>GO BACK</Link>
        </div>
      </div>
      <div className="userproject">
      </div>
      <div className='userproject'>
        {projects.map(project => (
          <Link key={project._id} to={`/project/${project._id}`} className='projectlink'>
            <div className='projectbox'>
              <div className='projecttitle'>{project.title}</div>
              <div className='projectbody'>{project.body}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Explorepage

