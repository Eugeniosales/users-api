const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../database/db');
const config = require('../config.json');
const router = express.Router();
var sql;

// Get all users
router.get('/users', (req, res) => {
    sql = 'SELECT * FROM users';
    db.query(sql, (err, response) => {
        if(err) throw err;
        res.json(response);
    });
});

// Get Authenticated user
router.get('/auth',  verifyToken, (req, res) => {
    jwt.verify(req.token, config.secret, (err, authData) => {
        
	const { data } = authData;

	if(err) res.send('Not ok');
        else {
            if(err) throw err;
            res.json({
                data
            });
        }
    });
});

//Register user
router.post('/register', (req, res) => {
    const {first_name, last_name, email, password } = req.body;
    
    //Desestructuring
    const user = {
        first_name,
        last_name,
        email,
        password
    }

    // Check if the user already exists
    sql = `SELECT * FROM users WHERE email = "${req.body.email}"`;
    db.query(sql, (err, response) => {
        if(err) throw err;
        if(!response.length){
            //Hashing the password
            //const hashedPassword = await bcrypt.hash(password, 10); 
            bcrypt.hash(password, 10, (err, hash) => {
                user.password = hash;
                
                //Insert new user
                const insert = 'INSERT INTO users SET ?';
                db.query(insert, user, (err, response) => {
                    if(err) throw err;
                    res.json({ message: "New user successfully added"});
                });
            
            });
        } else {
            res.json('User already exists');
        }
    });
    
    
});

//Login
router.post('/login', (req, res) => {
    sql = `SELECT * FROM users WHERE email = "${req.body.email}"`;
    db.query(sql, (err, user) =>{
        if(err) throw err;
        if(user.length){
            let data = user[0];
            if(bcrypt.compareSync(req.body.password, data.password)){
                jwt.sign({ data }, config.secret, { expiresIn: '2000s' }, (err, token) => {
                    res.json({ token });
                });
            }
            else res.sendStatus(404);
        }
        else res.sendStatus(404);
    });
});

//Verify Token middleware
function verifyToken(req, res, next) {
    const berearHeader = req.headers['authorization'];
    if(typeof berearHeader !== 'undefined'){
        const bearear = berearHeader.split(' ');
        req.token = bearear[1];
        next();
    
    }else {
        //Forbidden
        res.sendStatus(403);
    }
}

module.exports = router;
