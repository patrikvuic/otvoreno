var express = require('express');
var router = express.Router();
const db = require('../db');

router.get('/', async function(req, res, next) {
    const sqlData = await db.query(`SELECT DISTINCT redatelj_ime,redatelj_prezime FROM filmovi`,[]);
    const redatelji = sqlData.rows;
    if(redatelji.length > 0){
        res.setHeader('Content-type', 'application/json');
        let responseRedatelji={
            directors: redatelji,
            links : [{rel: "./movies", method: "GET", href: "/"}]
        }
        let response ={
            status : "OK",
            message : "Fetched director objects",
            response : responseRedatelji
        
        };
        res.status(200).json(response);
    }else{
        res.setHeader('Content-type', 'application/json');
        let response = {
            status : "Not Found",
            message: "No directors are found in the database.",
            reponse: null
        }
        res.status(404).json(response);
    }
});
router.all('*', (req, res, next) => {
    res.setHeader('Content-type', 'application/json');
    let response = {
        status : "Not implemented",
        message : "Method not implemented for requested resource",
        response : null
    }
    res.status(501).json(response);
});
module.exports = router;