var express = require('express');
var router = express.Router();
const db = require('../db');
const fetch = require('node-fetch');
const fs = require('fs');
var path = require('path');


router.get('/:id', async function(req, res, next) {
    let id = req.params.id;
    console.log(id);
    const sqlData = await db.query(`SELECT DISTINCT id, naziv_filma, wikipedia , redatelj_ime , redatelj_prezime, 
    filmski_studio, zemlja, zanr, trajanje_min, box_office_zarada_m$ FROM filmovi WHERE id = ${id}`,[]);
    const film = sqlData.rows[0];
    console.log(film);
    if(film){
        res.setHeader('Content-type', 'application/json');
        film.links = [{rel: "self", method: "GET", href:"https://en.wikipedia.org/wiki/"+film.wikipedia},
                        {rel: "actors", method: "GET", href:id+"/actors"}];
        film.slika = "http://localhost:3000/movies/" + id + "/picture";
        film["@context"] = {
            "@vocab": "http://schema.org/",
            "redatelj_ime": "givenName",
            "redatelj_prezime": "familyName",
            "naziv_filma": "name"
        }
        let response ={
            status : "OK",
            message : "Fetched movie object",
            response : film
        };
        res.status(200).json(response);
    }else{
        res.setHeader('Content-type', 'application/json');
        let response = {
            status : "Not Found",
            message: "Movie with the provided ID doesn't exist",
            reponse: null
        }
        res.status(404).json(response);
    }
});

router.post('/',async function(req,res,next){
    let{naziv_filma,wikipedia,redatelj_ime,redatelj_prezime,godina,filmski_studio,trajanje_min,zanr,zemlja,box_office_zarada_m$,glumci} =req.body;
    const idQuery  = await db.query("SELECT MAX(id) FROM filmovi",[]);
    let id = idQuery.rows[0].max;
    console.log(id);
    id = id+1;
    console.log(glumci);
    for(i = 0 ; i< glumci.length; i ++){
        //console.log(glumci[i].glumac_ime + " " + glumci[i].glumac_prezime)
        await db.query(`INSERT INTO filmovi (id,naziv_filma,wikipedia,redatelj_ime,redatelj_prezime,glumac_ime,glumac_prezime,
            godina,filmski_studio,trajanje_min,zemlja,zanr,box_office_zarada_m$) VALUES (${id},'${naziv_filma}','${wikipedia}','${redatelj_ime}',
                '${redatelj_prezime}','${glumci[i].glumac_ime}','${glumci[i].glumac_prezime}',${godina},'${filmski_studio}',${trajanje_min},
                '${zemlja}','${zanr}',${box_office_zarada_m$})`,[]);
    }
    const sqlData = await db.query(`SELECT DISTINCT id, naziv_filma, wikipedia , redatelj_ime , redatelj_prezime, 
    filmski_studio, zemlja, zanr, trajanje_min, box_office_zarada_m$ FROM filmovi WHERE id = ${id}`,[]);
    const film = sqlData.rows[0];
    film.links = [{rel: "self", method: "GET", href: film.id}];
    res.setHeader('Content-type', 'application/json');
    
    let response ={
        status : "OK",
        message : "Created movie object",
        response : film
    };
    res.status(201).json(response);

});
router.delete('/:id', async function(req, res, next) {
    let id = req.params.id;
    console.log(id);
    const sqlData = await db.query(`SELECT COUNT (id) FROM filmovi WHERE id = ${id}`,[]);
    const film = sqlData.rows[0];
    console.log(film);
    if(film.count > 0){
        await db.query(`DELETE FROM filmovi WHERE id = ${id}`,[])
        res.setHeader('Content-type', 'application/json');
        let response ={
            status : "OK",
            message : "DELETED movie object",
            response : {"id" : id,
            links : [{rel: "self", method: "POST", href:"/"}]
        }
        
        };
        res.status(200).json(response);
    }else{
        res.setHeader('Content-type', 'application/json');
        let response = {
            status : "Not Found",
            message: "Movie with the provided ID doesn't exist",
            reponse: null
        }
        res.status(404).json(response);
    }
});

router.put('/:id',async function(req,res,next){
    let{naziv_filma,wikipedia,redatelj_ime,redatelj_prezime,godina,filmski_studio,trajanje_min,zanr,zemlja,box_office_zarada_m$} =req.body;
    let id = req.params.id;

    const countSql = await db.query(`SELECT COUNT (id) FROM filmovi WHERE id = ${id}`,[]);
    const count = countSql.rows[0].count;
    if(count > 0){
        let update = `UPDATE filmovi SET`
        if(naziv_filma){
            update+=` naziv_filma = '${naziv_filma}',`
        }
        if(wikipedia){
            update+=` wikipedia = '${wikipedia}',`
        }
        if(redatelj_ime){
            update+=` redatelj_ime = '${redatelj_ime}',`
        }
        if(redatelj_prezime){
            update+=` redatelj_prezime = '${redatelj_prezime}',`
        }
        if(godina){
            update+=` godina = ${godina},`
        }
        if(filmski_studio){
            update+=` filmski_studio = '${filmski_studio}',`
        }
        if(trajanje_min){
            update+=` trajanje_min = ${trajanje_min},`
        }
        if(zanr){
            update+=` zanr = '${zanr}',`
        }
        if(zemlja){
            update+=` zemlja = '${zemlja}',`
        }
        if(box_office_zarada_m$){
            update+=` box_office_zarada_m$ = ${box_office_zarada_m$},`
        }
        update=update.substring(0,update.length-1);
        update+=` WHERE id = ${id}`;
        await db.query(update,[]);
        const sqlData = await db.query(`SELECT DISTINCT id, naziv_filma, wikipedia , redatelj_ime , redatelj_prezime, 
        filmski_studio, zemlja, zanr, trajanje_min, box_office_zarada_m$ FROM filmovi WHERE id = ${id}`,[]);
        const film = sqlData.rows[0];
        film.links = [{rel: "self", method: "GET", href: film.id}];
        res.setHeader('Content-type', 'application/json');
        
        let response ={
            status : "OK",
            message : "Updated movie object",
            response : film
        };
        res.status(200).json(response);
    }else{
        res.setHeader('Content-type', 'application/json');
        let response = {
            status : "Not Found",
            message: "Movie with the provided ID doesn't exist",
            reponse: null
        }
        res.status(404).json(response);
    }
});
router.get('/:id/actors', async function(req, res, next) {
    let id = req.params.id;
    console.log(id);
    const sqlData = await db.query(`SELECT glumac_ime,glumac_prezime FROM filmovi WHERE id = ${id}`,[]);
    const glumci = sqlData.rows;
    console.log(glumci.length>0);
    if(glumci.length > 0){
        res.setHeader('Content-type', 'application/json');
        let responseGlumci={
            glumci: glumci,
            links : [{rel: "./", method: "GET", href: "./"+id}]
        }
        responseGlumci["@context"] = {
            "@vocab": "http://schema.org/Person",
            "glumac_ime": "givenName",
            "glumac_prezime": "familyName",
        }
        let response ={
            status : "OK",
            message : "Fetched movie object",
            response : responseGlumci
        
        };
        res.status(200).json(response);
    }else{
        res.setHeader('Content-type', 'application/json');
        let response = {
            status : "Not Found",
            message: "Movie with the provided ID doesn't exist",
            reponse: null
        }
        res.status(404).json(response);
    }
});




router.get('/', async function(req, res, next) {
    
    const sqlData = await db.query(`SELECT DISTINCT id, naziv_filma, wikipedia , redatelj_ime , redatelj_prezime, 
    filmski_studio, zemlja, zanr, trajanje_min, box_office_zarada_m$ FROM filmovi ORDER BY id`,[]);
    const filmovi = sqlData.rows;
    if(filmovi.length>0){
        res.setHeader('Content-type', 'application/json');
        responseFilmovi = {
            filmovi : filmovi,
            links : [{rel: "self", method: "POST", href:"/"}]
        }
        responseFilmovi["@context"] = {
            "@vocab": "http://schema.org/",
            "redatelj_ime": "givenName",
            "redatelj_prezime": "familyName",
            "naziv_filma": "name"
        }
        let response ={
            status : "OK",
            message : "Fetched movie objects",
            response : responseFilmovi
        
        };
        res.status(200).json(response);
    }else{
        res.setHeader('Content-type', 'application/json');
        let response = {
            status : "Not Found",
            message: "Movie with the provided ID doesn't exist",
            reponse: null
        }
        res.status(404).json(response);
    }
});

router.get('/:id/picture', async function(req, res, next) {
    let id = req.params.id;
    console.log(id);
    const sqlData = await db.query(`SELECT DISTINCT wikipedia FROM filmovi WHERE id = ${id}`,[]);
    const film = sqlData.rows[0];
    console.log(film);
    
    if(film){
        if (fs.existsSync(`./public/${film.wikipedia}.jpg`)){
            console.log("file exists")
        }else{
            let url = "https://en.wikipedia.org/api/rest_v1/page/summary/"+film.wikipedia;
            let settings = { method: "Get" };
            let data = await fetch(url, settings);
            let pictureUrl = await data.json();
            pictureUrl = pictureUrl.originalimage.source;
            console.log(pictureUrl);
            const response = await fetch(pictureUrl);
            const buffer = await response.buffer();
            fs.writeFile(`./public/${film.wikipedia}.jpg`, buffer, () => 
            console.log('finished downloading!'));
        }
        fs.readFile(`./public/${film.wikipedia}.jpg`, function(err, data) {
            if (err) throw err;
            res.setHeader('Content-type', 'image/jpg');
            res.setHeader('Content-Disposition', 'inline')
            res.status(200).end(data);
        })
    }else{
        res.setHeader('Content-type', 'application/json');
        let response = {
            status : "Not Found",
            message: "Movie with the provided ID doesn't exist",
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