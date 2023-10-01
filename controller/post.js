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

module.exports.getAllPostJSON = (req, res) => {
  //const sql = `SELECT pkPostId as postId , fkUserId as author, title,createDateTime,updatedDateTime FROM post`;
  const sql = `SELECT users.firstName, post.*  FROM post
  LEFT JOIN users ON (post.fkUserId = users.pkUserId)`;
  dbConnection.query(sql, function (err, result, fields) {
    if (err) {
      res.send("error to get post");
      return;
    }

    //console.log("result", result);

    res.json(result);
  })
}


//new post form
module.exports.createNewPostForm = (req, res) => {
  res.render('newPostForm.ejs');
}

//create new post
module.exports.addNewPost = (req, res) => {
  const data = req.body;
  //console.log("=======req.body deta==========", req.body);

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
  //console.log("=======JSON==========", id);

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

module.exports.registrationForm = (req, res) => {
  res.render('registrationform.ejs');

}

module.exports.succesRegistrationForm = (req, res) => {
  //console.log('req.======================', req.body);
  const sql = `INSERT INTO users (firstName,lastName ,email,mobile,password,createDateTime , updateDateTime )
  values('${req.body.firstName}','${req.body.lastName}','${req.body.email}',${req.body.mobile},${req.body.password},now(),now() )`;
  //console.log('resultsql=======',sql);

  dbConnection.query(sql, function (err, result, fields) {
    //console.log('result=======',result);

    if (err) {
      res.send('new rejestraction err');
    }
    res.redirect('/');

  })

}

module.exports.loginForm = (req, res) => {

  res.render('loginform.ejs');
}

//login
module.exports.login = (req, res) => {
  //console.log('req.bodyyyyyyyyy', req.body);
  const sql = `SELECT * FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
  //console.log("sqlqqqqqqqqqq", sql);
  dbConnection.query(sql, function (err, result, fields) {
    //console.log('resultttttttttt', result);
    if (result.length == 0) {
      res.send('invalid');
    }
    //user found
    res.render('profile.ejs', { data: result[0] });
    //res.redirect('/');
  })


}

//get-profile
module.exports.profile = (req, res) => {
  let userData = null;
  try {
    //console.log("rrrrrrr", req.body);
    //console.log('req.params---------', req.params.uId);
    // get user data

    const sql = `SELECT * FROM users
    LEFT JOIN post ON users.pkUserId = post.fkUserId where users.pkUserId = '${req.params.uId}'`;
    dbConnection.query(sql, function (err, result, fields) {
      //console.log('result========', result);

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

//comment
module.exports.comment = (req, res) => {

  res.render('comment.ejs');

}

//view post
module.exports.view = (req, res) => {
  console.log('iddddddd', req.params.viewid);
  console.log('iddddddd', req.body);

  // const sql = `SELECT users.firstName, post.*  FROM post
  // LEFT JOIN users ON (post.fkUserId = users.pkUserId)`;
  const sql = `SELECT * FROM post WHERE pkPostId='${req.params.viewid}'`;
  dbConnection.query(sql, function (err, result, fields) {
    //console.log('resulttttttt',result);
    if (err) {
      res.send("error to get post");
      return;
    }

    //console.log("result", result);

    res.render('view.ejs', { title: 'Latest Blog List', list: result });
  })
}

//profile1
module.exports.profileican = (req, res) => {
  res.render("profile-ican.ejs");
}

//about
module.exports.about = (req, res) => {
  res.render("about.ejs");
}


//contact
module.exports.contact = (req, res) => {
  res.render("contact.ejs");
}


//new post form
module.exports.createNewPostForm = (req, res) => {
  res.render('newPostForm.ejs');
}

//create new post
module.exports.addNewPost = (req, res) => {
  const data = req.body;
  //console.log("=======req.body deta==========", req.body);

  const sql = `INSERT INTO post (fkUserId, title, content, createDateTime , updatedDateTime ) 
  values(${req.body.userId} , '${req.body.title}', ' ${req.body.content}',now(),now() ) `;
  dbConnection.query(sql, function (err, result, fields) {
    if (err) {
      res.send('add new post err')
    }
    res.redirect('/');
  })
}


//my post 
module.exports.mypost = (req, res) => {
  //console.log('req.params55555555555',req.params.id);
  sql = `select * from post
  left join users on users.pkUserId = post.fkUserId where users.pkUserId= ${req.params.id}`;
  dbConnection.query(sql, function (err, result, fields) {
    //console.log('result7777777777',result);
    if (err) {
      res.send('my post err');
    }

    res.render('myPost.ejs', { userData: result });
  });

}


//edit-post-form 
module.exports.editPostForm = (req, res) => {
  //console.log('red.params=======',req.params);
  const sql = `SELECT * FROM post WHERE pkPostId = ${req.params.id}`;
  dbConnection.query(sql, function (err, result, fields) {
    //console.log('results=======',result);

    if (err) {
      res.send('edit post err');
    }

    res.render("editpostform.ejs", { post: result[0] });
  });
}

//update post
module.exports.updatePost = (req, res) => {
  //console.log('req.body-------------->>>>', req.body);

  const sql = `update post set title = '${req.body.title}', content = '${req.body.content}',
                    updatedDateTime = now() where pkPostId =  '${req.body.id}'`;

  dbConnection.query(sql, function (err, result, fields) {
    //console.log('result', err);

    if (err) {
      res.send('err get update post')
      return;
    }
    res.redirect('/');
  })

}


//delete post
module.exports.deletePost = (req, res) => {
  console.log('req.body====^===', req.body);
  console.log('req.params====^===', req.params.id);

  const sql = `DELETE FROM post WHERE pkPostId = ${req.params.id}`;
  dbConnection.query(sql, function (err, result, fields) {
    if (err) {
      res.send('err delete post');
    }
    res.redirect('/');

  });
}

module.exports.Comment = (req, res) => {
  console.log('req.body', req.body);
  console.log('req.params', req.params);
  const sql = `INSERT INTO comments (fkUserId,fkPostId,comment) 
VALUES (${req.body.userid},${req.body.postid},'${req.body.commit}')`;
  console.log('sql', sql);
  dbConnection.query(sql, function (err, result, fields) {
    if (err) {
      res.send('comment err');
      return;
    }
    res.redirect('/');
  });



}