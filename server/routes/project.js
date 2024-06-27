import express from 'express';
import { Project } from '../models/project.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const projectrouter = express.Router();

const extractEmailFromToken = (localstorageToken) => {
  const token = localstorageToken;
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(token, "mehulbansal");
    return decoded.email;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

projectrouter.post('/addproject', async (req, res) => {
  const { title, body, token } = req.body;

  const userEmail = extractEmailFromToken(token);
  const user = await User.findOne({ email: userEmail });
  const walletaddress = user.walletaddress;
  if (!userEmail) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const newproject = new Project({
    title,
    body,
    createdBy: userEmail,
    walletaddressofuser:walletaddress
  })

  await newproject.save();
  return res.json({ status: true, message: "record registered!" });
})

const extractEmailFromTokenToFetchProjects = (req) => {
  const token = req.headers.authorization;
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(token.split(' ')[1], 'mehulbansal');
    return decoded.email;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

projectrouter.get('/', async (req, res) => {

  try {
    const userEmail = extractEmailFromTokenToFetchProjects(req);
    const projects = await Project.find({ createdBy: userEmail });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

projectrouter.get('/getallproject', async (req, res) => {

  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

projectrouter.get('/:ProjectId', async (req, res) => {

  const ProjectId = req.params.ProjectId;
  try {
    const projects = await Project.findById(ProjectId);
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})

export { projectrouter };


