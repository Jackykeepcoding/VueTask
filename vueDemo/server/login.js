let db = require('./db')

exports.login = (req, res) => {
  var sql = 'select * from userlogin where name = ? and password = ?'
  db.query(sql, [req.query.name, req.query.password], (err, data) => {
    if (err) {
      res.send('用户名或密码错误')
    }
    res.send(data)
  })
}
