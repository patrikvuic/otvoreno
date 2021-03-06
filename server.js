const express = require('express');
const app = express();
var path = require('path');
const bodyParser = require('body-parser');
var hateoasLinker = require('express-hateoas-links');
const expressOasGenerator = require('express-oas-generator');
const cacheTime = 86400000 ;

expressOasGenerator.init(app, {});

//const indexRouter = require('./routes/index.routes');
//const datatableRouter = require('./routes/datatable.routes');
const movieRouter = require ('./routes/filmovi.routes');
const studioRouter = require('./routes/studio.routes');
const directorRouter = require('./routes/director.routes');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public'),{
    maxAge: 86400000
   }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(hateoasLinker);
app.use(express.json());


//app.use('/',indexRouter);
//app.use('/datatable',datatableRouter);
app.use('/movies',movieRouter);
app.use('/studios',studioRouter);
app.use('/directors',directorRouter);

app.get('/openapi', async function(req, res){
    res.setHeader('Content-disposition', 'attachment; filename= openapi.json');
    res.setHeader('Content-type', 'application/json');
    res.download('./openapi.json');
});

app.all('*', (req, res, next) => {
    res.setHeader('Content-type', 'application/json');
    let response = {
        status : "Not implemented",
        message : "Method not implemented for requested resource",
        response : null
    }
    res.status(501).json(response);
});

app.listen(3000);