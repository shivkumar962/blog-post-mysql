const { dbConnection } = require('../db');


module.exports.getAllPost = (req, res) => {
  // get all post from db
  const sql = `SELECT pkPostId as postId ,fkUserId as userId, title, content, createDateTime, 
                 updatedDateTime, recordStatus  FROM post WHERE recordStatus = '1'`;

  dbConnection.query(sql, function (err, result, fields) {
    if (err) {
      console.log('res db err ---', err);
    }
    console.log('res db------------->>>>>>>>>', result);
    res.render('home.ejs', { title: 'Latest Blog List', list: result });
  });

}

module.exports.getPostById = (req, res) => {
  console.log('req-->>>>', req.params.id);

  // get post from db
  const sql = `SELECT pkPostId as postId ,fkUserId as userId, title, content, createDateTime, updatedDateTime, recordStatus  
                FROM post 
                WHERE recordStatus = '1' and pkPostId = ${req.params.id}`;
  dbConnection.query(sql, function (err, result, fields) {
    if (err) {
      res.send('error to get post');
      return;
    }

    console.log('db  res-->>>>', result[0]);
    const p = result[0];
    const postData = {
      title: p.title,
      content: p.content,
      createdDate: p.createDateTime,
      updatedDate: p.updatedDateTime,
    }
  
    res.render('postView.ejs', { post: postData });
  })



}

