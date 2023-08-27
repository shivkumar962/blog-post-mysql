const express = require('express');
const router = express.Router();
const postController = require('../controller/post');
console.log('postController',postController);
// http protocols
// get: get data
// post: add new data
// put: update existing data 
//delete: delete data


//const blog =[{shiv:"malviya"}];

/* GET home page. */
router.get('/', postController.getAllPost);

//view full post by id
router.get('/view-post/:id', postController.getPostById);







module.exports = router;
