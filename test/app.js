
var express=require('express')
var app=express()
let config = require('config');
var morgan= require('morgan')
let bodyParser = require('body-parser');
let mongoose=require('mongoose')
let port = 8080;
var user=require('./routes/user.route.js');
mongoose.connect(config.DBHost, {useNewUrlParser: true, useUnifiedTopology: true}).then(con=>console.log('Connected to DB')).catch(err=>console.log(err));

if(config.util.getEnv('NODE_ENV')!=='test'){
    app.use(morgan('dev'));
}
app.use(bodyParser.json())
app.use(bodyParser({extended:true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/json'}))

app.get('/',(req,res)=>{res.json({message:'Welcome to our  User App'})})


app.route('/user').get(user.getusers).post(user.postuser);

app.route('/user/:id').get(user.getuser).delete(user.deleteuser).put(user.updateuser);

app.listen(port);
console.log('Listening on port'+port)

module.exports=app;