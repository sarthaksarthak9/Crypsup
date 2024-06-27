import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const userrouter = express.Router();

userrouter.post('/signup', async (req, res) => {
    const { username, email, password, walletaddress } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        return res.json({ message: "user already existed!" });
    }

    const hashedpassword = await bcrypt.hash(password, 10)
    const newuser = new User({
        username,
        email,
        password: hashedpassword,
        walletaddress
    })

    await newuser.save();
    return res.json({ status: true, message: "record registered!" });
})

userrouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (!user) {
        return res.json({ message: "user is not registered!" });
    }

    const validpassword = await bcrypt.compare(password, user.password)
    if (!validpassword) {
        return res.json({ message: "password is incorrect!" });
    }

    const token = jwt.sign({
        username: user.username,
        email: user.email,
    }, "mehulbansal");

    res.cookie('token', token, { httpOnly: true, message: 360000 });
    return res.json({ status: true, message: "login successfully!", token });

})

userrouter.post('/forgotpassword', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.json({ message: "user not registered!" });
        }

        const token = jwt.sign({ id: user._id }, 'jwttoken', { expiresIn: '5m' })

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mehulbansalswm1234@gmail.com',
                pass: 'zqnb omqm xymd gocm',
            }
        });

        var mailOptions = {
            from: 'mehulbansalswm1234@gmail.com',
            to: email,
            subject: 'Reset Password Link',
            text: `http://localhost:5173/resetpassword/${token}`
        }

        transporter.sendMail(mailOptions, function (erro, info) {
            if (error) {
                return res.json({ status: true, message: "error sending email" });
            } else {
                return res.json({ status: true, message: "email sent" });
            }
        })

    } catch (err) {
        console.log(err);
    }
})

userrouter.post('/resetpassword/:token', async (req, res) => {

    const token = req.params.token;
    const { password } = req.body;

    try {
        const decoded = await jwt.verify(token, 'jwttoken');
        const id = decoded.id;

        const hashedpassword = await bcrypt.hash(password, 10)
        await User.findByIdAndUpdate({ _id: id }, { password: hashedpassword })

        return res.json({ status: true, message: "updated successfully!" });

    } catch (err) {
        return res.json({ message: "invalid token" })
    }
})

userrouter.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ status: true });
})

export { userrouter }