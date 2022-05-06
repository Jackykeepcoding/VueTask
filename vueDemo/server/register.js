let db = require('./db')

exports.register = (req, res) => {
  var sql1 = 'INSERT INTO userlogin VALUES (?,?)'
  var sql2 = 'select * from userlogin where name = ?'
  // let name = req.body.name
  // let password = req.body.password
  // eslint-disable-next-line handle-callback-err
  db.query(sql2, [req.body.name], (err, data) => {
    if (data.length > 0) {
      res.send('1')
    } else {
      db.query(sql1, [req.body.name, req.body.password], (err, data) => {
        res.send('2')
        if (err) {
          return res.send('错误：')
        }
      })
    }
  })
}
