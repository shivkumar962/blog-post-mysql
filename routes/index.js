var express = require('express');
var router = express.Router();

// http protocols
// get: get data
// post: add new data
// put: update existing data 
//delete: delete data

let studentList = [
  {
    id: 1,
    firstName: "Sanjay",
    lastName: "Kumar",
    email: "sanjay.kumar@example.com",
    phone: "7012345678",
    address: "567, Green Street, Jaipur",
    date: "2023-07-30",
  },
  {
    id: 2,
    firstName: "Neha",
    lastName: "Shah",
    email: "neha.shah@example.com",
    phone: "7123456789",
    address: "901, Red Avenue, Ahmedabad",
    date: "2023-07-30",
  },
  {
    id: 3,
    firstName: "Vikram",
    lastName: "Gupta",
    email: "vikram.gupta@example.com",
    phone: "9012345678",
    address: "321, Lake View, Chennai",
    date: "2023-07-30",
  },
];
//const blog =[{shiv:"malviya"}];

/* GET home page. */
router.get('/', function (req, res) {
  res.render('home.ejs', { title: 'Latest Blog List', list: studentList });
});
/* GET login page. */
router.get('/login', function (req, res) {
  res.render('login.ejs');
});

/* POST add user. */
router.post('/add-user', function (req, res) {
  const data = req.body
  console.log('user-->>', data);
  const index = studentList[studentList.length-1];
  
  const newItem = {
    id: index.id + 1,
    firstName: data.fname,
    lastName: data.lasName,
    email: data.emai,
    phone: data.phon,
    address: data.add,
    date: data.date,
  } 
  studentList.push(newItem);
  //  console.log("studentList",studentList);
  res.redirect('/');
});

// delete user by id
router.post('/delete-user', function (req, res) {
  console.log("delete -->>>>",req.body);
  
  studentList = studentList.filter(function(item) {
    return item.id !== parseInt(req.body.userId) ;
  })
  
   res.redirect('/');
});

module.exports = router;
