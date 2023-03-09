const client = require("./DB");

const addMessage = function(message, callback){
    const maxLength = 100
    message = message.length > maxLength ?
        message.substring(0, maxLength - 1) + '…' :
        message;

    const query = {
        text: "INSERT INTO purechat (message) VALUES ($1::text)",
        values: [message],
    };

    client.query(query, (err, res) => {
        if(err){ return callback(err); }
        console.log(`Added message: ${message} to purechat table; res: ${res}`);
        callback(null);
    });
}

const getMessages = function(amount, callback){
    const query = {
        text: `SELECT message, message_date FROM purechat ORDER BY message_date LIMIT ${amount}`,
        rowMode: 'array',
    }

    client.query(query, (err, res) => {
        if(err){ return callback(err, null); }
        callback(null, res.rows);
    });
}

module.exports.addMessage = addMessage;
module.exports.getMessages = getMessages;
