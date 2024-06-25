import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './projectpage.css';
import { Link } from 'react-router-dom';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);
  const [projectcomments, setprojectcomments] = useState(null);
  const [comment, setcomment] = useState('');

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('supportertoken');
    Axios.post('http://localhost:3000/comment/', {
      comment,
      projectId,
      token,
    }).then(response => {
      if (response.data.status) {
        navigate('/supporterdashboard')
      }
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchProjectDetails();
  }, [projectId]);

  useEffect(() => {
    fetchProjectComments();
  }, [projectId]);

  const fetchProjectDetails = async () => {
    try {
      const response = await Axios.get(`http://localhost:3000/username/${projectId}`);
      setProjectDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };

  const fetchProjectComments = async () => {
    try {
      const response = await Axios.get(`http://localhost:3000/comment/${projectId}`);
      setprojectcomments(response.data);
    } catch (error) {
      console.error('Error fetching project comments:', error);
    }
  };

  if (!projectDetails) {
    return <div>Loading...</div>;
  }

  const copyToClipboard = () => {
    const textField = document.createElement('textarea');
    textField.innerText = projectDetails.walletaddressofuser;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    alert('Wallet address copied to clipboard!');
  };

  return (
    <div className='project-details'>
      <div className="exploreheader">
      <div className='logo'>
        <img src="/assets/crypsup.png" alt="" />
        <div className='headerheading'>CRYPSUP</div>
      </div>
      <div className="exploreheading">CONTENT DETAILPAGE</div>
      <div className='goback'>
        <Link to='/explorepage'>GO BACK</Link>
      </div>
      </div>
      <div className="projectsdetaildiv">
        <h2>{projectDetails.title}</h2>
        <p>{projectDetails.body}</p>
        <p>Wallet Address: {projectDetails.walletaddressofuser}</p>
        <button onClick={copyToClipboard}>Copy Wallet Address</button>
        <button className='cw'><a href="http://localhost:1234">CONNECT WALLET</a></button>

        <div className="comment">
          <form onSubmit={handlesubmit}>
            <input type="text" placeholder='write your comment here!' onChange={(e) => setcomment(e.target.value)} />
            <input type="submit"/>
          </form>
        </div>
      </div>
      <div className="projectcommentsdiv">
        {projectcomments ? (
          projectcomments.map((project, index) => (
            <div key={index} className='projectcommentbox'>
              <div className='projeccomment'>{project.comment}</div>
            </div>
          ))
        ) : (
          <div>No comments yet.</div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
