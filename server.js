const express = require('express');
const app = express();
var path = require('path');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index.routes');
const datatableRouter = require('./routes/datatable.routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',indexRouter);
app.use('/datatable',datatableRouter);

app.listen(3000);