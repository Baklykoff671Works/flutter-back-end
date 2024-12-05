const express = require("express");
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

let mysqlConnection = mysql.createConnection(require("./db_config"));
mysqlConnection.connect((err) => {
    if (err) {
        console.log('Connection is failed', err)
    }
    else {
        console.log('Connection is successful')
    }
});

const PORT = 5050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


app.get("/users", (req, res) => {
    mysqlConnection.query("SELECT * FROM user", (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log('trouble')
            throw err;
        }
    });
});


app.get("/users/:email", (req, res) => {
    mysqlConnection.query(
        "SELECT * FROM user WHERE email=?", [req.params.email], (err, rows, fields) => {
            if (!err) {
                console.log(typeof (rows[0]))
                console.log(rows[0])
                res.send(rows[0]);
            } else {
                throw err;
            }
        }
    )
})


app.post("/users", (req, res) => {
    console.log("Result", req.body);
    mysqlConnection.query(
        "INSERT INTO user(email, username, password) values(?,?,?)",
        [
            req.body.email,
            req.body.username,
            req.body.password,
        ],
        (err, response) => {
            if (!err) {
                res.send("User has been inserted succesfull");
            } else {
                throw err;
            }
        }
    )
})


app.get("/arts", (req, res) => {
    mysqlConnection.query("SELECT * FROM arts", (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log('trouble')
            throw err;
        }
    });
});
