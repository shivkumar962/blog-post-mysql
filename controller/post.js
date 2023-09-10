const { dbConnection } = require('../db');
const fs = require('fs');
//__dirname -> gives current path
const filePath = __dirname + '/data.txt';
const newfilePath = __dirname + '/user.txt';
const getAllPost = (req, res) => {
  // get all post from db
  // console.log('file Path', filePath);
  let fileData = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
  fileData = JSON.parse(fileData);

  // console.log('res---------|||---->>>>>>>>>', fileData);
  res.render('home.ejs', { title: 'Latest Blog List', list: fileData });
}

module.exports.getAllPost = getAllPost;





//new post form
module.exports.createNewPostForm = (req, res) => {
  res.render('newPostForm.ejs');
}

//create new post
module.exports.addNewPost = (req, res) => {
  const data = req.body;
  //console.log("=======req.body deta==========", data);

  let fileData = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
   //console.log("=======datatext readFileSync==========", fileData);

  fileData = JSON.parse(fileData);
   //console.log("=======datatext JSON==========", fileData);

  const id = fileData[fileData.length - 1].postId + 1;
 //console.log("iddddddddddddddddd", id)

 

  const ndata = {
    postId: id,
    title: data.title,
    content: data.content,
    createDateTime: new Date(),
    updatedDateTime: new Date(),
    userId : data.userId
  }

  fileData.push(ndata);
  // console.log("=======push(deta);==========", fileData);

  fileData = JSON.stringify(fileData);
  fs.writeFileSync(filePath, fileData);

  res.redirect('/');
}

//get post by id
module.exports.getPostById = (req, res) => {
  // console.log('req-->>>>', req.params.id);

  const data = req.body;
  // console.log("=======deta==========", data);

  let fileData = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
  // console.log("=======readFileSync==========", fileData);

  fileData = JSON.parse(fileData);
  // console.log("=======JSON==========", fileData);

  const id = req.params.id;

  let newdata = {};
  for (let i = 0; i < fileData.length; i++) {

    if (fileData[i].postId == id) {
      newdata = fileData[i]
      // console.log("newdata========================", newdata);
      break;
    }


  }



  res.render('postView.ejs', { post: newdata });
}


///view-post-shiv
module.exports.getPostByIdShiv = (req, res) => {
  const sql = `SELECT pkPostId as postId ,fkUserId as userId, title, content, createDateTime, updatedDateTime, recordStatus  
    FROM post WHERE recordStatus = '1' and pkPostId = ${req.params.id}`;

  dbConnection.query(sql, function (err, result, fields) {
    if (err) {
      res.send("error to get post");
      return;
    }
    // console.log('shiv_sql------------>>>>>>>>>', sql);
    // console.log('shiv_result------------>>>>>>>>>', result);

    const p = result[0]
    const postData = {
      title: p.title,
      content: p.content,
      createdDate: p.createDateTime,
      updatedDate: p.updatedDateTime,
    }

    res.render("postView.ejs", { post: postData });
  })
}

//
module.exports.editPostById = (req, res) => {
  // console.log('editPostById req-->>>>', req.params.id);
  let fileData = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
  fileData = JSON.parse(fileData);

  let id = req.params.id;
  // console.log('--------id=======', id);

  let newdata = {};
  for (let i = 0; i < fileData.length; i++) {
    if (fileData[i].postId == id) {
      newdata = fileData[i];
    }
  }
  // console.log('--------newdata=======', newdata);

  res.render('edit.ejs', { post: newdata });


}

module.exports.updatePost = (req, res) => {
  // console.log('req.body-------------->>>>', req.body);
  let fileData = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
  fileData = JSON.parse(fileData);

  let postData = {};
  if (fileData) {
    postData = fileData.find((item) => item.postId == req.body.id);
    // console.log("===========findpostData=======", postData);

    if (postData) {
      postData.title = req.body.title;
      postData.content = req.body.content;
      postData.updatedDateTime = new Date();
    }
    // console.log("===========lastpostData=======", postData);
  }


  fs.writeFileSync(filePath, JSON.stringify(fileData));
  res.redirect('/');
}

module.exports.deletePost = (req, res) => {
  // console.log('req.body=======', req.body);
  // console.log('req.params=======', req.params.id);

  let filedata = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
  filedata = JSON.parse(filedata);

  console.log('filedata', filedata);


  let newd = [];


  if (filedata) {
    newd = filedata.filter((itam) => itam.postId != req.params.id);
    // console.log('newwwwwww', newd);
  }

  fs.writeFileSync(filePath, JSON.stringify(newd));
  res.redirect('/');
}

module.exports.registrationForm = (req, res) => {
  res.render('registrationForm.ejs');

}

module.exports.succesRegistrationForm = (req, res) => {
  console.log('req.======================', req.body);
  let newfiledata = fs.readFileSync(newfilePath, { encoding: 'utf8', flag: 'r' });
  newfiledata = JSON.parse(newfiledata);
  console.log('newfiledata==old======', newfiledata);
  let id = (newfiledata[newfiledata.length - 1].id) + 1;

  let ndata = {
    id: id,
    name: req.body.Name,
    mobile: req.body.mobile,
    email: req.body.email,
    password: req.body.password
  }
  newfiledata.push(ndata);
  console.log('newfiledata====new===', newfiledata);

  newfiledata = JSON.stringify(newfiledata);
  fs.writeFileSync(newfilePath, newfiledata);
  res.redirect('/');
}

module.exports.loginForm = (req, res) => {

  res.render('loginform.ejs');
}

//login
module.exports.login = (req, res) => {
  console.log('req.bodyyyyyyyyy', req.body);
  let fileData = fs.readFileSync(newfilePath, { encoding: 'utf8', flag: 'r' });
  fileData = JSON.parse(fileData);
  let user = null;
  if (fileData && Array.isArray(fileData)) {
    user = fileData.find(userObj => userObj.email == req.body.email && userObj.password == req.body.password);
    console.log('userrrrrrrrrrrrr', user);
  }
  if (!user) {
    res.send('invalid username password');
    return;
  }

  //user found
  res.render('profile.ejs', { data: user })
}

//get-profile
module.exports.profile = (req, res) => {
  let userData = null;
  try {
    console.log("rrrrrrr", req.body);
    console.log('req.params---------', req.params.uId);
    // get user data
    let userFileData = fs.readFileSync(newfilePath, { encoding: 'utf8', flag: 'r' });
    userFileData = JSON.parse(userFileData);

    if (userFileData) {
      userData = userFileData.find((itam) => itam.id == req.params.uId);
      console.log('userDatasssssss', userData);
    }

    //get post data
    let filedata = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
    filedata = JSON.parse(filedata);
    let datatxt = filedata.filter((itam) => itam.userId == req.params.uId);
    console.log("match_id----", datatxt);

    



    //get user data by id
    res.render('profileicon.ejs', {userData ,datatxt });
  }


  catch (error) {
    console.log('profile page error', error);
  }
}
