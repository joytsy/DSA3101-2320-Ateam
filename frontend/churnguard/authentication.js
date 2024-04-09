const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express()

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "loginsystem",
});

// To add name, password and email into a database.
app.post('/register', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;

    db.query(
        "INSERT INTO users (name, password, email) VALUES (?,?,?)", 
        [name, password, email], 
        (err, result) => {
            console.log(err);
        }
    );
});

// To check if email and password combination is correct.
app.post('/login', (req, res) => {
    const password = req.body.password;
    const email = req.body.email;

    db.query(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email, password],
        (err, result) =>{
            console.log(result)
            if (err) {
                res.send({ err: err});
            }    
            if (result.length > 0) {
                res.send(result);
                
            } else {
                res.send({message: "Wrong email/password combination!"});
            }         
        }
    );
});


app.listen(3001, () => {
    console.log("running server");
});