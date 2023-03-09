const express = require("express");
const { addMessage, getMessages } = require("./pureChatTable");

const app = express();
const port = 3000;
const messageAmount = 100;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

const getData = (req, res, next) => {
    getMessages(messageAmount, (err, jsonObj) => {
        if(err){
            console.log(`Can't get data from purechat table: ${err}`)
            return res.status(500);
        }
        res.dbReceivedData = jsonObj;
        next();
    })
};

const sendData = (req, res) => {
    res.status(200).json(res.dbReceivedData);
}

const addData = (req, res, next) => {
    if(!req.body) { return res.status(400); }
    addMessage(req.body.message, (err) => {
        if(err){
            console.log(`Can't add messages to purechat table: ${err}`);
            return res.status(500);
        }
        next();
    });
}

app.route("/api")
    .get([getData, sendData])
    .post([addData, getData, sendData]);
