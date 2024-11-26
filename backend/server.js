const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    const sqlQuery = "SELECT * FROM student";
    connectDb.query(sqlQuery, (error, data) => {
        if (error) {
            console.error(`Error during database query : ${error.message}`);
            return res.status(500).json({message: "Database query failed"});
        };
        console.log(`Succesfully fetched data : ${data}`);
        res.json(data);
    });
});

app.post("/create", (req, res) => {
    const sqlQuery = "INSERT INTO student (Name, Email) VALUES (?, ?)";
    const values = [
        req.body.name,
        req.body.email,
    ];
    connectDb.query(sqlQuery, values, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    })
});

app.put("/update/:id", (req, res) => {
    const sqlQuery = "UPDATE student SET Name = ?, Email = ? WHERE ID = ?";
    const values = [
        req.body.name,
        req.body.email,
    ];
    const id = req.params.id;
    connectDb.query(sqlQuery, [...values, id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.delete("/student/:id", (req, res) => {
    const sqlQuery = "DELETE FROM student WHERE ID = ?";
    const id = req.params.id;
    connectDb.query(sqlQuery, id, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});