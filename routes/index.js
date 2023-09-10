const express = require('express');
const router = express.Router();
const postController = require('../controller/post');

// console.log('postController',postController);
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

//shiv router
router.get('/view-post-shiv/:id', postController.getPostByIdShiv);


//edit post
router.get('/edit-post/:id', postController.editPostById);

//update post post 
router.post('/update-post', postController.updatePost);

//form create post 
router.get('/new-post-form', postController.createNewPostForm);

//create new post 
router.post('/add-new-post', postController.addNewPost)

//delete-user
router.post('/delete-post/:id', postController.deletePost);

//Registration Form
router.get('/registration-form', postController.registrationForm);

//succesregistration
router.post('/succesregistration', postController.succesRegistrationForm);

//loginform
router.get('/login-form', postController.loginForm);

//login
router.post('/login', postController.login);

//get-profile
router.get('/get-profile/:uId', postController.profile);






module.exports = router;
