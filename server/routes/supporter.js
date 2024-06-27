import express from 'express';
import bcrypt from 'bcrypt';
import { Supporter } from '../models/supporter.js';
import jwt from 'jsonwebtoken';
// import nodemailer from 'nodemailer';

const supporterrouter = express.Router();

supporterrouter.post('/supportersignup', async (req, res) => {
    const { username, email, password } = req.body;
    const supporter = await Supporter.findOne({ email });

    if (supporter) {
        return res.json({ message: "supporter already existed!" });
    }

    const hashedpassword = await bcrypt.hash(password, 10)
    const newsupporter = new Supporter({
        username,
        email,
        password: hashedpassword,
    })

    await newsupporter.save();
    return res.json({ status: true, message: "record registered!" });
})

supporterrouter.post('/supporterlogin', async (req, res) => {
    const { email, password } = req.body;
    const supporter = await Supporter.findOne({ email })

    if (!supporter) {
        return res.json({ message: "supporter is not registered!" });
    }

    const validpassword = await bcrypt.compare(password, supporter.password)
    if (!validpassword) {
        return res.json({ message: "password is incorrect!" });
    }

    const token = jwt.sign({
        username: supporter.username,
        email: supporter.email,
    }, "mehulbansalsupporter");

    res.cookie('supportertoken', token, { httpOnly: true, message: 360000 });
    return res.json({ status: true, message: "login successfully!",token });

})

// userrouter.post('/forgotpassword', async (req, res) => {
//     const { email } = req.body;

//     try {
//         const user = await User.findOne({ email })

//         if (!user) {
//             return res.json({ message: "user not registered!" });
//         }

//         const token = jwt.sign({ id: user._id }, 'jwttoken', { expiresIn: '5m' })

//         var transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'mehulbansalswm1234@gmail.com',
//                 pass: 'zqnb omqm xymd gocm',
//             }
//         });

//         var mailOptions = {
//             from: 'mehulbansalswm1234@gmail.com',
//             to: email,
//             subject: 'Reset Password Link',
//             text: `http://localhost:5173/resetpassword/${token}`
//         }

//         transporter.sendMail(mailOptions, function (erro, info) {
//             if (error) {
//                 return res.json({ status: true, message: "error sending email" });
//             } else {
//                 return res.json({ status: true, message: "email sent" });
//             }
//         })

//     } catch (err) {
//         console.log(err);
//     }
// })

// userrouter.post('/resetpassword/:token', async (req, res) => {

//     const token = req.params.token;
//     const { password } = req.body;
 
//     try {
//         const decoded = await jwt.verify(token, 'jwttoken');
//         const id = decoded.id;

//         const hashedpassword = await bcrypt.hash(password, 10)
//         await User.findByIdAndUpdate({_id:id},{password:hashedpassword})

//         return res.json({status:true,message:"updated successfully!"});

//     } catch (err) {
//         return res.json({message:"invalid token"})
//     }

// })

supporterrouter.get('/logout',(req,res)=>{
    res.clearCookie('supportertoken');
    return res.json({status:true});
})

export { supporterrouter }