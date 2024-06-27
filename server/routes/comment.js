import express from 'express';
import { Comment } from '../models/comment.js';
import jwt from 'jsonwebtoken';

const commentrouter = express.Router();

const extractEmailFromToken = (localstorageToken) => {
    const token = localstorageToken;
    if (!token) {
      return null;
    }
    try {
      const decoded = jwt.verify(token, "mehulbansalsupporter");
      return decoded.email;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

commentrouter.post('/', async (req, res) => {
    const { comment, projectId, token } = req.body;

    const supporterEmail = extractEmailFromToken(token);
    if (!supporterEmail) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const newcomment = new Comment({
        comment,
        commentedTo:projectId,
        commentedBy:supporterEmail,
    })

    await newcomment.save();
    return res.json({ status: true, message: "record registered!" });
})

commentrouter.get('/:ProjectId', async (req, res) => {

  const ProjectId = req.params.ProjectId;
  try {
    const projectscomments = await Comment.find({commentedTo:ProjectId}).select(' -_id comment');
    res.json(projectscomments);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
})

export { commentrouter }