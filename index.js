var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;

db.once('open', function() {
  console.log('DB connection');
});

db.on('error',function(err) {
  console.log('DB ERROR : ', err);
});


app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

var contactSchema = mongoose.Schema({
  name:{type:String, required:true, unique:true},
  email:{type:String},
  phone:{type:String}
});
var Contact = mongoose.model('contact', contactSchema);


// Routes
// home
app.get('/', function(req, res) {
  console.log('Home');
  res.redirect('/contacts');
});

// contacts - index
app.get('/contacts', function(req, res) {
  console.log('Contacts - Index');
  Contact.find({}, function(err, contacts) {
    if (err) return res.json(err);
    res.render('contacts/index', {contacts:contacts});
  });
});

// contacts - new
app.get('/contacts/new', function(req, res) {
  console.log('Contacts - New');
  res.render('contacts/new');
});

// contacts - create
app.post('/contacts', function(req, res) {
  console.log('Contacts - Create');
  Contact.create(req.body, function(err, contact) {
    if (err) return res.json(err);
    res.redirect('/contacts');
  });
});

// contacts - show
app.get('/contacts/:id', function(req, res) {
  console.log('Contacts - Show');
  Contact.findOne({_id:req.params.id}, function(err, contact) {
    if (err) return res.json(err);
    res.render('contacts/show', {contact:contact});
  });
});

// contacts - edit
app.get('/contacts/:id/edit', function(req, res) {
  console.log('Contacts - Edit');
  Contact.findOne({_id:req.params.id}, function(err, contact) {
    if (err) return res.json(err);
    res.render('contacts/edit', {contact:contact});
  });
});

// contacts - update
app.put('/contacts/:id', function(req, res) {
  console.log('Contacts - Update');
  Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact) {
    if (err) return res.json(err);
    res.redirect('/contacts');
  });
});

// contacts - destroy
app.delete('/contacts/:id', function(req, res) {
  console.log('Contacts - Destroy');
  Contact.remove({_id:req.params.id}, function(err, contact) {
    if (err) return res.json(err);
    res.redirect('/contacts');
  });
});


app.listen(3000, function() {
  console.log('server on!!');
});
