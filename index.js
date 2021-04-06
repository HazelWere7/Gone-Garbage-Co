// console.log('Hello, World, Node is working');

//importing the express library/framework
const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const passport = require('passport');
//require expre session 
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});


const dotenv = require("dotenv");

dotenv.config();

//instantiating express in constant app
const app = express();

//import employee route
const employeeRoutes = require('./routes/employeeRoute');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');

//reg model
const Registration = require('./models/Registration')



//db connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .once('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });
  app.use(express.static('public'));

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session())

passport.use(Registration.createStrategy());
passport.serializeUser(Registration.serializeUser());
passport.deserializeUser(Registration.deserializeUser());
//configurations- setting pug as templete engine
app.set('view engine', 'pug');
app.set('views', './views');

//custom middleware
app.use((req, res, next) => {
  console.log('a new request received aat ' + Date.now());
  next();
});

// middleware for serving static files(css,js,images)
app.use(express.static('public'));
app.use('/public/images', express.static(__dirname + '/public/images'));

// //createEmployee route
// app.get('/createEmployee', (req, res) => {
//     // res.send('Homepage! Hello World.');
//     //res.sendFile(__dirname + '/index.html')
//     res.render('createEmployee', {title: 'Employee'});
// });


//instantiting employee route
app.use('/employee', employeeRoutes);
//app.use('/', homeRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);



//orders route
app.get('/createOrders', (req, res) => {
  res.render('createOrders', { title: 'create Order' });
});

//path parameters -used to specify the exact route

//incase a route doesnt exist
app.get('*', (req, res) => {
  res.send('the route specified doesnt exist');
});

// logout
app.post('/logout', (req, res) => {
  if (req.session) {
      req.session.destroy((err)=> {
          if (err) {
              console.log(err)
          } else {
              return res.redirect('/login');
          }
      })
  }
})


//query parameters

//server to run at port 5000
app.listen(5000, () => console.log('listening on port 5000'));

/**
 * what is crud
 * what are http methods
 */

/**
 * when user visits browser at http://localhost:3804/
 * --browser conducts a READ operation by sending a GET request to the server
 * --server receives a GET request and handles itt using the express get() method
 * --this express get() method  has 2 arguments , app.get(path/endpoint, callback function)
 * --the first arugement which is the path/end point appears after the domain name for this case its '/'
 * -- then the second argument is a call back function whith 2 arguments (req,res),
 * --it use   s the res object to send a response back to the browser , it does this by send() method res.send()
 * For Callbacks --we are usign ES^ arrow functions instead of the older way of writing functions
 */

/**
 * app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
that is under middleware

 */
