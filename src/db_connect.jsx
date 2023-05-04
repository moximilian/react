const mysql = require('mysql')
const db = mysql.createConnection({
    host:"http://127.0.0.1/",
    user:'root',
    password:"",
    database:'todos'
})

module.exports = db;