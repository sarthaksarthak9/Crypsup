import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const response = await Axios.post(
                'http://localhost:3000/username/addproject',
                { title, body, token }
            );

            if (response.data.status) {
                navigate('/userdashboard');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='sign-up-container'>
            <h2>Add project</h2>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <label htmlFor='title'>title:</label>
                <input type='text' placeholder='title' onChange={(e) => setTitle(e.target.value)} />

                <label htmlFor='body'>body:</label>
                <input type='text' placeholder='body' onChange={(e) => setBody(e.target.value)} />

                <button type='submit'>Add Project</button>
            </form>
        </div>
    );
};

export default CreateProject;
