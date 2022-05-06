let db = require('./db')

exports.picture = (req, res) => {
  var sql = 'select * from goods_pic'
  db.query(sql, [req.query.src], (err, data) => {
    if (err) {
      res.send(err)
    }
    res.send(data)
  })
}
