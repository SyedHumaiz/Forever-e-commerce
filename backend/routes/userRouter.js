import express from 'express'
import db from '../util/db.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator';

const router = express.Router();

// register api

router.post("/register", (req, res) => {
    try {
        const q = "SELECT * FROM userModel where name = ? or email = ?";
        db.query(q, [req.body.name, req.body.email], (err, data) => {
            if (err) return res.json(err)
            if (data.length) return res.json({ success: false, message: "User already existed" })
            if (!validator.isEmail(req.body.email)) return res.json({ success: false, message: "Enter a valid email" })
            if (req.body.password.length < 8) return res.json({ success: false, message: "Enter a strong password" })

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            // role value = 0 for user , 1 for admin


            const Q = "INSERT INTO userModel(name , email , password ,role) VALUES(?, ? , ? ,0)";
            db.query(Q, [req.body.name, req.body.email, hash], (err, result) => {
                if (err) return res.json(err)
                const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
                return res.json({ success: true, message: "User has been created", token })
            })
        })
    } catch (error) {
        res.send({ message: error.message })
    }
})

// login api

router.post('/login', (req, res) => {
    const q = "SELECT * FROM userModel where email = ? and role = 0"
    db.query(q, [req.body.email ], (err, data) => {
        if (err) return res.json({ success: false, message: "User does'nt existed" })
        if (data.length > 0) {
            const isPasswordCorrect = bcrypt.compareSync(
                req.body.password,
                data[0].password
            )
            if (isPasswordCorrect) {
                const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET_KEY, { expiresIn: "1w" })
                res.json({ success: true, token })
            }
            else {
                res.json({ success: false, message: "Invalid credentials" })
            }
        }
    })
})

// admin login

router.post("/adminlogin", (req, res) => {
    const { email, password } = req.body;
    const q = "SELECT * FROM userModel where email = ? and password = ? and role = 1";
    db.query(q, [email, password], (err, result) => {
        if (err) return res.json({ success: false, message: err.message })
        if (result.length === 0) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }
        if (result.length > 0) {
            const token_key = email + password
            const token = jwt.sign(token_key, process.env.JWT_SECRET_KEY)
            return res.json({ success: true, token: token, token_key: token_key })
        }
    })

})

export { router as userRouter }