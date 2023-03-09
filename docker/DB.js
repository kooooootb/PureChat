const pg = require("pg");

const config = {
    user: "kotb",
    password: "super_password",
    host: "postgres",
    port: 5432,
    database: "chatdb",
};

const client = new pg.Client(config);

client.connect(err => {
    if(err){
        console.log("Can't connect to database", err.stack);
    } else{
        console.log("Connected to database");
    }
});

module.exports = client;
