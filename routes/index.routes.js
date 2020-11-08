var express = require('express');
var router = express.Router();
const db = require('../db');

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Index'
    });
});

router.get('/json', async function(req, res){
    //await db.query("copy (SELECT row_to_json(filmovi) FROM (SELECT * FROM filmovi) filmovi) TO '/tmp/filmovi.json'");
    res.setHeader('Content-disposition', 'attachment; filename= filmovi.json');
    res.setHeader('Content-type', 'application/json');
    res.download('./filmovi.json');
});

router.get('/csv', async function (req, res) {
    //await db.query("copy (SELECT * FROM filmovi) TO '/tmp/filmovi.csv' csv header");
    res.setHeader('Content-disposition', 'attachment; filename= filmovi.csv');
    res.setHeader('Content-type', 'application/csv');
    res.download('./filmovi.csv');
});

module.exports = router;