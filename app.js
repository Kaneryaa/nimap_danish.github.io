var express =require('express');
var app=express();
var mysql=require('mysql');
var bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set("view engine", 'ejs');

var conn=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'node'
});



conn.connect(function(err){
  if(err) throw err;
  console.log("connection successful");
});

app.get('/',function(req,res){
  res.render('insert');
});
app.post('/insert',function(req,res){
  // var name=req.body.name;
  // var email=req.body.email;
  // var password=req.body.password;

  // var sql = 'insert into users(user_name,user_email,user_password) values('${name}','${email}','${pas}')';
  var sql="insert into users values(null,'"+req.body.name+"','"+req.body.categoryName+"','"+req.body.categoryId+"')"
  conn.query(sql,function(err,results){
      if(err) throw err;
      res.send("<h1>data send</h1>");
  });

});

app.get('/show',function(req,res){
  var sql='select * from users';
  conn.query(sql,function(err,results){
      if(err) throw err;
      res.render('show',{users:results});
  });

});

app.get('/delete/:ProductId',function(req,res){
  var id=req.params.ProductId;
  var sql="delete from users where ProductId= '${id}'";
  conn.query(sql,function(err,results){
      if(err) throw err;
      res.redirect('/show');
  });
});

app.get('/edit/:id',function(req,res){
  var id=req.params.id;
  var sql="select * from users where ProductId= '${id}'";
  conn.query(sql,function(err,results){
      if(err) throw err;
      res.render('edit',{users:results});
  });
});

app.post('/update/:id',function(req,res){
  var id=req.params.id;
  var sql="update into users values(null,'"+req.body.name+"','"+req.body.email+"','"+req.body.password+"') where ProductId='$(id)'";
  conn.query(sql,function(err,results){
      if(err) throw err;
      res.redirect('/show');
  });

});

//how many data we want to show each page pagination
var resultspage=30;
app.get('/',(req,res) =>{
  var sql = 'select * from users'
   conn.query(sql,(err,result) => {
     if(err) throw err;
     console.log(result)
   });

});

var server=app.listen(4000,function(){
  console.log("App running on 4000...............");
});
