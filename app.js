const express = require("express");
const app = express();
const path = require("path");

const methodOverride = require("method-override"); 
const session = require("express-session"); 
const cookieParser = require("cookie-parser"); 
const cors = require("cors");

const indexRouter = require("./src/routes/indexRouter");
const generalRouter = require("./src/routes/generalRouter");

let port = process.env.PORT || 3000;

app.use(session({secret:"La banda de Luxo", resave: true,
saveUninitialized: true})); 
app.use(express.urlencoded({extended: false}));
app.use(express.json()); 
app.use(cookieParser());
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/src/views"));  

app.use(express.static(path.join(__dirname, './public'))); 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use("/", indexRouter); 
app.use("/all", generalRouter); 


app.use(function(req,res){
    return res.status(404).send("not-found")    
 }) 

app.listen(port, function(){
    console.log(`El servidor está corriendo en el puerto ${port}`)
});  