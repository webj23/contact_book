var express = require('express');
var router = express.Router();
var Contact = require('../models/Contact');

// contacts - index
router.get('/', function(req, res) {
  console.log('Contacts - Index');
  Contact.find({}, function(err, contacts) {
    if (err) return res.json(err);
    res.render('contacts/index', {contacts:contacts});
  });
});

// contacts - new
router.get('/new', function(req, res) {
  console.log('Contacts - New');
  res.render('contacts/new');
});

// contacts - create
router.post('/', function(req, res) {
  console.log('Contacts - Create');
  Contact.create(req.body, function(err, contact) {
    if (err) return res.json(err);
    res.redirect('/contacts');
  });
});

// contacts - show
router.get('/:id', function(req, res) {
  console.log('Contacts - Show');
  Contact.findOne({_id:req.params.id}, function(err, contact) {
    if (err) return res.json(err);
    res.render('contacts/show', {contact:contact});
  });
});

// contacts - edit
router.get('/:id/edit', function(req, res) {
  console.log('Contacts - Edit');
  Contact.findOne({_id:req.params.id}, function(err, contact) {
    if (err) return res.json(err);
    res.render('contacts/edit', {contact:contact});
  });
});

// contacts - update
router.put('/:id', function(req, res) {
  console.log('Contacts - Update');
  Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact) {
    if (err) return res.json(err);
    res.redirect('/contacts');
  });
});

// contacts - destroy
router.delete('/:id', function(req, res) {
  console.log('Contacts - Destroy');
  Contact.remove({_id:req.params.id}, function(err, contact) {
    if (err) return res.json(err);
    res.redirect('/contacts');
  });
});

module.exports = router;
