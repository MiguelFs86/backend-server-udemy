var express = require('express');
var mongoose = require('mongoose');

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) {
        throw err;
    }
    console.log('Base de datos online');
});

var app = express();


app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});