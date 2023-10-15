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

router.get('/get-all-post-json', postController.getAllPostJSON);



//view full post by id
router.get('/view-post/:id', postController.getPostById);


//edit post
router.get('/edit-post/:id', postController.editPostById);

//form create post 
router.get('/new-post-form', postController.createNewPostForm);

//create new post 
router.post('/add-new-post', postController.addNewPost)


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

//comment form
 router.get('/comment', postController.comment);

 
//view post
router.get('/viewpost/:viewid', postController.view);

//profile
router.get('/profile', postController.profileican);

//about
router.get('/about', postController.about);


//contact
router.get('/contact', postController.contact);

//form create post 
router.post('/new-post-form', postController.createNewPostForm);


//my post 
router.get('/mypost/:id', postController.mypost);


//edit-post-form 
router.get('/edit-post-form/:id', postController.editPostForm);


//update post post 
router.post('/update-post', postController.updatePost);



//delete-user
router.post('/delete-post/:id', postController.deletePost);

//comment post
router.post('/comment', postController.Comment);

//comment get
router.get('/post-comments/:postId', postController.getPostAllComments);


//like post
router.post('/like', postController.likePost);


//getAllLike
router.get('/getAllLike', postController.getAllLike);












module.exports = router;
