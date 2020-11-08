var express = require('express');
var router = express.Router();
const db = require('../db');

let params=[];
router.get('/',  async function(req, res, next) {
    const sqlData = await db.query("SELECT DISTINCT naziv_filma,wikipedia,redatelj_ime,redatelj_prezime,godina,filmski_studio,trajanje_min,zemlja,zanr,box_office_zarada_m$ FROM filmovi;",params);
    const filmovi=sqlData.rows;
    const sqlData2= await db.query("SELECT DISTINCT naziv_filma,glumac_ime,glumac_prezime FROM filmovi",params);
    const glumci = sqlData2.rows;
    res.render('datatable', {
        title: 'Datatable',
        filmovi: filmovi,
        glumci: glumci,
        inputText: null,
        selected:'wildcard'
    });
});
router.post('/', async function (req, res, next) {
    var sqlData;
    var sqlData2;
    if(req.body.filter==='godina'){
        sqlData = await db.query("SELECT DISTINCT naziv_filma,wikipedia,redatelj_ime,redatelj_prezime,godina,filmski_studio,trajanje_min,zemlja,zanr,box_office_zarada_m$ FROM filmovi WHERE " + req.body.filter + " = " + req.body.input + ";" ,params);
    }else if(req.body.filter==='wildcard'){
        if(req.body.input!==''){
            if(isNaN(req.body.input)){
                sqlData = await db.query("SELECT DISTINCT naziv_filma,wikipedia,redatelj_ime,redatelj_prezime,godina,filmski_studio,trajanje_min,zemlja,zanr,box_office_zarada_m$ FROM filmovi WHERE naziv_filma LIKE '%" + req.body.input + 
                "%' OR wikipedia LIKE '%" + req.body.input + "%' OR redatelj_ime LIKE '%" + req.body.input + "%' OR redatelj_prezime LIKE '%" + req.body.input + "%' OR glumac_ime LIKE '%" + req.body.input + 
                "%' OR glumac_prezime LIKE '%" + req.body.input + "%' OR filmski_studio LIKE '%" + req.body.input + "%' OR zemlja LIKE '%" + req.body.input + 
                "%' OR zanr LIKE '%" + req.body.input + "%';" ,params);
            }else{
                sqlData = await db.query("SELECT DISTINCT naziv_filma,wikipedia,redatelj_ime,redatelj_prezime,godina,filmski_studio,trajanje_min,zemlja,zanr,box_office_zarada_m$ FROM filmovi WHERE  godina = " + req.body.input + " OR trajanje_min = " +
                req.body.input + " OR box_office_zarada_m$ = " + req.body.input + ";" ,params);
            }
        }else{
            sqlData = await db.query("SELECT DISTINCT naziv_filma,wikipedia,redatelj_ime,redatelj_prezime,godina,filmski_studio,trajanje_min,zemlja,zanr,box_office_zarada_m$ FROM filmovi;",params);
        }    
    }else{
        sqlData = await db.query("SELECT DISTINCT naziv_filma,wikipedia,redatelj_ime,redatelj_prezime,godina,filmski_studio,trajanje_min,zemlja,zanr,box_office_zarada_m$ FROM filmovi WHERE " + req.body.filter + " LIKE '%" + req.body.input + "%';" ,params);
    }
    sqlData2= await db.query("SELECT DISTINCT naziv_filma,glumac_ime,glumac_prezime FROM filmovi",params);
    
    const filmovi=sqlData.rows;
    const glumci=sqlData2.rows;

    res.render('datatable', {
        title: 'Datatable',
        filmovi: filmovi,
        glumci: glumci,
        inputText: req.body.input,
        selected: req.body.filter
    });
});

router.post('/csv',  async function(req, res, next) {
    if(req.body.filter==='godina'){
        await db.query("copy (SELECT DISTINCT filmovi.naziv_filma,filmovi.wikipedia,filmovi.redatelj_ime,filmovi.redatelj_prezime,filmovi2.glumac_ime,filmovi2.glumac_prezime,filmovi.godina,filmovi.filmski_studio,filmovi.trajanje_min,filmovi.zemlja," + 
        "filmovi.zanr,filmovi.box_office_zarada_m$ FROM filmovi JOIN filmovi AS filmovi2 ON filmovi.naziv_filma=filmovi2.naziv_filma WHERE filmovi." + req.body.filter + " = " + req.body.input + ") TO '/tmp/filmovi.csv' csv header;" ,params);
    }else if(req.body.filter==='wildcard'){
        if(req.body.input!==''){
            if(isNaN(req.body.input)){
                await db.query("copy (SELECT DISTINCT filmovi.naziv_filma,filmovi.wikipedia,filmovi.redatelj_ime,filmovi.redatelj_prezime,filmovi2.glumac_ime,filmovi2.glumac_prezime,filmovi.godina,filmovi.filmski_studio,filmovi.trajanje_min,filmovi.zemlja," + 
                "filmovi.zanr,filmovi.box_office_zarada_m$ FROM filmovi JOIN filmovi AS filmovi2 ON filmovi.naziv_filma=filmovi2.naziv_filma WHERE filmovi.naziv_filma LIKE '%" + req.body.input + 
                "%' OR filmovi.wikipedia LIKE '%" + req.body.input + "%' OR filmovi.redatelj_ime LIKE '%" + req.body.input + "%' OR filmovi.redatelj_prezime LIKE '%" + req.body.input + "%' OR filmovi.glumac_ime LIKE '%" + req.body.input + 
                "%' OR filmovi.glumac_prezime LIKE '%" + req.body.input + "%' OR filmovi.filmski_studio LIKE '%" + req.body.input + "%' OR filmovi.zemlja LIKE '%" + req.body.input + 
                "%' OR filmovi.zanr LIKE '%" + req.body.input + "%') TO '/tmp/filmovi.csv' csv header;" ,params);
            }else{
                await db.query("copy (SELECT DISTINCT filmovi.naziv_filma,filmovi.wikipedia,filmovi.redatelj_ime,filmovi.redatelj_prezime,filmovi2.glumac_ime,filmovi2.glumac_prezime,filmovi.godina,filmovi.filmski_studio,filmovi.trajanje_min,filmovi.zemlja," + 
                "filmovi.zanr,filmovi.box_office_zarada_m$ FROM filmovi JOIN filmovi AS filmovi2 ON filmovi.naziv_filma=filmovi2.naziv_filma WHERE filmovi.godina = " + req.body.input + " OR filmovi.trajanje_min = " + req.body.input + " OR filmovi.box_office_zarada_m$ = " + req.body.input + ") TO '/tmp/filmovi.csv' csv header;" ,params);
            }
        }else{
            await db.query("copy (SELECT * FROM filmovi) TO '/tmp/filmovi.csv' csv header;",params);
        }    
    }else{
        await db.query("copy (SELECT DISTINCT filmovi.naziv_filma,filmovi.wikipedia,filmovi.redatelj_ime,filmovi.redatelj_prezime,filmovi2.glumac_ime,filmovi2.glumac_prezime,filmovi.godina,filmovi.filmski_studio,filmovi.trajanje_min,filmovi.zemlja," + 
        "filmovi.zanr,filmovi.box_office_zarada_m$ FROM filmovi JOIN filmovi AS filmovi2 ON filmovi.naziv_filma=filmovi2.naziv_filma  WHERE filmovi." + req.body.filter + " LIKE '%" + req.body.input + "%') TO '/tmp/filmovi.csv' csv header;" ,params);
    }
    res.setHeader('Content-disposition', 'attachment; filename= filmovi.csv');
    res.setHeader('Content-type', 'application/csv');
    res.download('/tmp/filmovi.csv');
});

router.post('/json',  async function(req, res, next) {
    if(req.body.filter==='godina'){
        await db.query("copy (SELECT row_to_json(filmovi) FROM (SELECT DISTINCT filmovi.naziv_filma,filmovi.wikipedia,filmovi.redatelj_ime,filmovi.redatelj_prezime,filmovi2.glumac_ime,filmovi2.glumac_prezime,filmovi.godina,filmovi.filmski_studio,filmovi.trajanje_min,filmovi.zemlja," + 
        "filmovi.zanr,filmovi.box_office_zarada_m$ FROM filmovi JOIN filmovi AS filmovi2 ON filmovi.naziv_filma=filmovi2.naziv_filma WHERE filmovi." + req.body.filter + " = " + req.body.input + ") filmovi) TO '/tmp/filmovi.json';" ,params);
    }else if(req.body.filter==='wildcard'){
        if(req.body.input!==''){
            if(isNaN(req.body.input)){
                await db.query("copy (SELECT row_to_json(filmovi) FROM (SELECT DISTINCT filmovi.naziv_filma,filmovi.wikipedia,filmovi.redatelj_ime,filmovi.redatelj_prezime,filmovi2.glumac_ime,filmovi2.glumac_prezime,filmovi.godina,filmovi.filmski_studio,filmovi.trajanje_min,filmovi.zemlja," + 
                "filmovi.zanr,filmovi.box_office_zarada_m$ FROM filmovi JOIN filmovi AS filmovi2 ON filmovi.naziv_filma=filmovi2.naziv_filma WHERE filmovi.naziv_filma LIKE '%" + req.body.input + 
                "%' OR filmovi.wikipedia LIKE '%" + req.body.input + "%' OR filmovi.redatelj_ime LIKE '%" + req.body.input + "%' OR filmovi.redatelj_prezime LIKE '%" + req.body.input + "%' OR filmovi.glumac_ime LIKE '%" + req.body.input + 
                "%' OR filmovi.glumac_prezime LIKE '%" + req.body.input + "%' OR filmovi.filmski_studio LIKE '%" + req.body.input + "%' OR filmovi.zemlja LIKE '%" + req.body.input + 
                "%' OR filmovi.zanr LIKE '%" + req.body.input + "%') filmovi) TO '/tmp/filmovi.json';" ,params);
            }else{
                await db.query("copy (SELECT row_to_json(filmovi) FROM (SELECT DISTINCT filmovi.naziv_filma,filmovi.wikipedia,filmovi.redatelj_ime,filmovi.redatelj_prezime,filmovi2.glumac_ime,filmovi2.glumac_prezime,filmovi.godina,filmovi.filmski_studio,filmovi.trajanje_min,filmovi.zemlja," + 
                "filmovi.zanr,filmovi.box_office_zarada_m$ FROM filmovi JOIN filmovi AS filmovi2 ON filmovi.naziv_filma=filmovi2.naziv_filma WHERE filmovi.godina = " + req.body.input + " OR filmovi.trajanje_min = " + req.body.input + " OR filmovi.box_office_zarada_m$ = " + req.body.input + ") filmovi)  TO '/tmp/filmovi.json'" ,params);
            }
        }else{
            await db.query("copy (SELECT row_to_json(filmovi) FROM (SELECT * FROM filmovi) filmovi) TO '/tmp/filmovi.json';",params);
        }    
    }else{
        await db.query("copy  SELECT row_to_json(filmovi) FROM (SELECT DISTINCT filmovi.naziv_filma,filmovi.wikipedia,filmovi.redatelj_ime,filmovi.redatelj_prezime,filmovi2.glumac_ime,filmovi2.glumac_prezime,filmovi.godina,filmovi.filmski_studio,filmovi.trajanje_min,filmovi.zemlja," + 
        "filmovi.zanr,filmovi.box_office_zarada_m$ FROM filmovi JOIN filmovi AS filmovi2 ON filmovi.naziv_filma=filmovi2.naziv_filma  WHERE filmovi." + req.body.filter + " LIKE '%" + req.body.input + "%') filmovi) TO '/tmp/filmovi.json';" ,params);
    }
    res.setHeader('Content-disposition', 'attachment; filename= filmovi.json');
    res.setHeader('Content-type', 'application/json');
    res.download('/tmp/filmovi.json');
});

module.exports = router;