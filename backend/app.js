// var createError = require('http-errors');
var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var bodyParser = require('body-parser');
var querystring = require("querystring");
var mysql = require('mysql');

var conn = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'root',
  database : 'formsys'
});

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  next();
});//allow ChangeOrigin

app.get('/form',function(req,res){
  console.log(req.query);
  var getform = "select * from view" + req.query.key;
  conn.query(getform,function(err,result){
    if(err){
      console.log(err);
      res.end;
    }
    else{
      console.log(result);
      res.send(result);
      res.end;
    }
  });
});//get form

app.post('/create',function(req,res){
  console.log(req.body);
  req.on("data",function(data){//listening data
    // console.log(decodeURIComponent(data));//decode
    var param = querystring.parse(decodeURIComponent(data));//to object
    var data = JSON.parse(data);//parse
    console.log(data);
    var formkey = data[data.length-1].key;
    var formname = data[data.length-1].formname;
    data.splice(data.length-1,1);
    // var datastr = JSON.stringify(data);
    // conn.connect;
    // console.log(datastr);
    conn.query("insert into formlist(formkey,formname) values (?,?)",[formkey,formname],function(err,result){
      if(err){
        console.log(err.message);
        // res.writeHead(500,{'Content-Type':'text/html'});
        res.send('0');
        res.end();
        return;
      }
      // res.writeHead(200,{'Conten-Type':'text/html'});

      var createfviewtable = "CREATE TABLE view" + formkey + " (id INT(11) NOT NULL AUTO_INCREMENT";
      for(var i in data[0]){
        createfviewtable += ("," + i + " varchar(255)");
      }
      createfviewtable += ",PRIMARY KEY(id))DEFAULT CHARSET=utf8";
      // console.log(createfviewtable);
      conn.query(createfviewtable, function(err){
        if(err){
          console.log(err.message);
          // res.writeHead(500,{'Content-Type':'text/html'});
          res.send('0');
          res.end();
          return;
        }
        // var insertfitem1 = "insert into view" + formkey + "(";
        // var insertfitem2 = " values (";
        for(var i in data){
        var insertfitem1 = "insert into view" + formkey + "(";
        var insertfitem2 = " values (";
          for(var j in data[i]){
            insertfitem1 += (j + ",");
            insertfitem2 += ("\"" + data[i][j] + "\",");
            // console.log(data[i]);
          }
        insertfitem1 = insertfitem1.substring(0,insertfitem1.length-1);
        insertfitem2 = insertfitem2.substring(0,insertfitem2.length-1);
        insertfitem1 += ")";
        insertfitem2 += ")";
        console.log(i);
        console.log(insertfitem1+insertfitem2);
        conn.query(insertfitem1 + insertfitem2);
        }
      });

      var createfield = "";
      for(var datap = 0; datap < data.length; datap++)
      {
        createfield += (data[datap].name + ' varchar(255),');
      }
      var creattable = "CREATE TABLE " + formkey + " (id INT(11) NOT NULL AUTO_INCREMENT,"+ createfield +"PRIMARY KEY(id))DEFAULT CHARSET=utf8";
      conn.query(creattable,function(err,result){
        if(err){
          console.log(err.message);
          // res.writeHead(500,{'Content-Type':'text/html'});
          res.send('0');
          res.end();
          return;
        }
        res.send('1');
        res.end();
      });
    });
  });
});//create form

app.post('/formpost',function(req,res){
  req.on("data",function(data){
    var data = JSON.parse(data);//parse
    var fkey = data[data.length-1].key;
    var insertdata = 'insert into ' +  fkey + '(' + data[0].name;
    for(var i = 1; i < data.length-1 ;i ++){
      insertdata += (',' + data[i].name)
    }
    insertdata += ') values (';
    insertdata += ('\"' + data[0].value + '\"');
    for(var i = 1; i < data.length-1 ;i ++){
      insertdata += (',\"' + data[i].value + '\"')
    }
    insertdata += ')';
    console.log(insertdata);
    conn.query(insertdata,function(err,result){
      if(err){
        console.log(err.message);
        // res.writeHead(500,{'Content-Type':'text/html'});
        insertdata = '';
        res.send('0');
        res.end();
        return;
      }
      insertdata = '';
      res.send('1');
      res.end();
    });
  });
});//form submit


app.get('/present',function(req,res){
  //  console.log(req.query);
    conn.query('select * from formlist',function(err,result){
      if(err){
        console.log(err);
        res.send('0');
        res.end();
        return;
      }
      else{
          console.log(result);
          res.send(result);
          res.end();
      }
    });
});//chcek data formlist

app.post('/details',function(req,res){
  // console.log('88');
  req.on("data",function(data){
    var data = JSON.parse(data);
    console.log(data.params.key);
    var sql='select * from '+data.params.key;
    // console.log(sql);
    conn.query(sql,function(err,result){
      if(err){
        console.log(err);
        res.send("0");
        res.end();
        return;
      }
      else{
        console.log(result);
        var keys=Object.keys(result[0]);
        // console.log(keys);
        res.send(result);
      }
    });
  });
});//check data formdata

module.exports = app;
