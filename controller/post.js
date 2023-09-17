const { dbConnection } = require('../db');
const fs = require('fs');
const { post } = require('../routes');
//__dirname -> gives current path
const postDataFilePath = __dirname + '/data.txt';
const userDataFilePath = __dirname + '/user.txt';
const getAllPost = (req, res) => {
  //const sql = `SELECT pkPostId as postId , fkUserId as author, title,createDateTime,updatedDateTime FROM post`;
  const sql = `SELECT users.firstName, post.*  FROM post
  LEFT JOIN users ON (post.fkUserId = users.pkUserId)`;
  dbConnection.query(sql, function (err, result, fields) {
    if (err) {
      res.send("error to get post");
      return;
    }

    //console.log("result", result);
    res.render('home.ejs', { title: 'Latest Blog List', list: result });
  })
}
module.exports.getAllPost = getAllPost;

//new post form
module.exports.createNewPostForm = (req, res) => {
  res.render('newPostForm.ejs');
}

//create new post
module.exports.addNewPost = (req, res) => {
  const data = req.body;
  console.log("=======req.body deta==========", req.body);

  const sql = `INSERT INTO post (fkUserId, title, content, createDateTime , updatedDateTime ) 
  values(${req.body.userId} , '${req.body.title}', ' ${req.body.content}',now(),now() ) `;
  dbConnection.query(sql, function (err, result, fields) {
    if (err) {
      res.send('add new post err')
    }
    res.redirect('/');
  })
}

//get post by id
module.exports.getPostById = (req, res) => {
  // console.log('req-->>>>', req.params.id);


  const id = req.params.id;
  console.log("=======JSON==========", id);

  const sql = `SELECT * FROM post`;
  dbConnection.query(sql, function (err, result, fields) {
    if (err) {
      res.send("error to get post");
      return;
    }

    //console.log("result", result);

    let newdata = {};
    for (let i = 0; i < result.length; i++) {

      if (result[i].pkPostId == id) {
        newdata = result[i]
        // console.log("newdata========================", newdata);
        break;
      }
    }
    res.render('postView.ejs', { post: newdata });

  })
}

//
module.exports.editPostById = (req, res) => {
  // console.log('editPostById req-->>>>', req.params.id);
  let id = req.params.id;
  // console.log('--------id=======', id);

  const sql = `SELECT * FROM post`;
  dbConnection.query(sql, function (err, result, fields) {
    if (err) {
      res.send("error to get post");
      return;
    }

    //console.log("result", result);



    let newdata = {};
    for (let i = 0; i < result.length; i++) {
      if (result[i].pkPostId == id) {
        newdata = result[i];
      }
    }
    // console.log('--------newdata=======', newdata);

    res.render('edit.ejs', { post: newdata });


  })
}

module.exports.updatePost = (req, res) => {
  console.log('req.body-------------->>>>', req.body);

  const sql = `update post set title = '${req.body.title}', content = '${req.body.content}',
                    updatedDateTime = now() where pkPostId =  '${req.body.id}'`;

  dbConnection.query(sql, function (err, result, fields) {
    console.log('result', err);

    if (err) {
      res.send('err get update post')
      return;
    }
    res.redirect('/');
  })

}

module.exports.deletePost = (req, res) => {
  // console.log('req.body=======', req.body);
  // console.log('req.params=======', req.params.id);

  const sql = `delete from post where pkPostId = '${req.params.id}'`;
  dbConnection.query(sql, function (err, result, fields) {
    if (err) {
      res.send('err delete post');
    }
    res.redirect('/');

  })
}

module.exports.registrationForm = (req, res) => {
  res.render('registrationForm.ejs');

}

module.exports.succesRegistrationForm = (req, res) => {
  console.log('req.======================', req.body);
  let newfiledata = fs.readFileSync(userDataFilePath, { encoding: 'utf8', flag: 'r' });
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
  fs.writeFileSync(userDataFilePath, newfiledata);
  res.redirect('/');
}

module.exports.loginForm = (req, res) => {

  res.render('loginform.ejs');
}

//login
module.exports.login = (req, res) => {
  console.log('req.bodyyyyyyyyy', req.body);
  const sql = `SELECT * FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
  console.log("sqlqqqqqqqqqq", sql);
  dbConnection.query(sql, function (err, result, fields) {
    console.log('resultttttttttt', result);
    if (result.length == 0) {
      res.send('invalid');
    }
    //user found
    res.render('profile.ejs', { data: result[0] });
  })


}

//get-profile
module.exports.profile = (req, res) => {
  let userData = null;
  try {
    console.log("rrrrrrr", req.body);
    console.log('req.params---------', req.params.uId);
    // get user data

    const sql = `SELECT * FROM users
    LEFT JOIN post ON users.pkUserId = post.fkUserId where users.pkUserId = '${req.params.uId}'`;
    dbConnection.query(sql, function (err, result, fields) {
      console.log('result========', result);

      if (err) {
        res.send('invalid profile');
      }
      //get user data by id
      res.render('profileicon.ejs', { userData: result });
    });
  }
  catch (error) {
    console.log('profile page error', error);
  }
}
