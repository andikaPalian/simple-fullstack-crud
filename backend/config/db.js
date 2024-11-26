const mysql = require("mysql2");

const connectDb = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud",
});

connectDb.connect((error) => {
    if (error) {
        console.error(`Error connecting to mysql : ${error.message}`);
        return;
    };
    console.log(`Connected to mysql database : ${connectDb.config.host}`);
});

module.exports = connectDb