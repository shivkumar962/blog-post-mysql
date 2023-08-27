var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// /* GET login page. */
// router.get('/login', function (req, res) {
//   res.render('login.ejs');
// });

// /* POST add user. */
// router.post('/add-user', function (req, res) {
//   const data = req.body
//   console.log('user-->>', data);
//   const index = studentList[studentList.length-1];
  
//   const newItem = {
//     id: index.id + 1,
//     firstName: data.fname,
//     lastName: data.lasName,
//     email: data.emai,
//     phone: data.phon,
//     address: data.add,
//     date: data.date,
//   } 
//   studentList.push(newItem);
//   //  console.log("studentList",studentList);
//   res.redirect('/');
// });

// // delete user by id
// router.post('/delete-user', function (req, res) {
//   console.log("delete -->>>>",req.body);
  
//   studentList = studentList.filter(function(item) {
//     return item.id !== parseInt(req.body.userId) ;
//   })
  
//    res.redirect('/');
// });

module.exports = router;
