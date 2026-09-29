const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "vishu7",
    database: "myProject"
});

db.connect(function(error) {

    if (error) {
        console.log("Database connection failed!");
        console.log(error.message);
    } 
    else {
        console.log("MySQL database connected successfully!");
    }

});


app.get("/", function(req, res) {

    res.send("CSE IntelliLearn Server is Running");

});


app.get("/subjects", function(req, res) {

    db.query("SELECT * FROM subjects", function(error, result) {

        if (error) {
            return res.status(500).json({
                error: error.message
            });
        }

        res.json(result);

    });

});


app.get("/units/:subject_id", function(req, res) {

    const subjectId = req.params.subject_id;

    db.query(
        "SELECT * FROM units WHERE subject_id = ? ORDER BY unit_number",
        [subjectId],
        function(error, result) {

            if (error) {
                return res.status(500).json({
                    error: error.message
                });
            }

            res.json(result);

        }
    );

});


app.get("/materials/:unit_id", function(req, res) {

    const unitId = req.params.unit_id;

    db.query(
        "SELECT * FROM materials WHERE unit_id = ?",
        [unitId],
        function(error, result) {

            if (error) {
                return res.status(500).json({
                    error: error.message
                });
            }

            res.json(result);

        }
    );

});


app.listen(3000, function() {

    console.log("Server running on http://localhost:3000");

});