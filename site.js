var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var argv = require('optimist').argv;
var fs = require('fs');
var packagejson = require('./package.json');

var app = express();

var index_html = fs.readFileSync('./index.html');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'html');
//app.engine('html', swig.renderFile);

// обработка вывода счетчиков
//app.all('*', function(req, res, next){
//    var counters = false;
//    
//    // если мы в продакшене - выводим
//    if (req.headers.host.indexOf('socprofile.clienddev.ru') !== -1) 
//        counters = true;
//    
//    // посылам в шаблонизатор
//    swig.setDefaults({
//        locals:{
//            counters: counters,
//            version: packagejson.version
//        }
//    });
//    
//    next();
//});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.send()
})

//app.use('/', routes);

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});

// error handlers

// development error handler
// will print stacktrace
//if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
        console.log(err);
    });
//}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('app listening at http://%s:%s', host, port)
});


