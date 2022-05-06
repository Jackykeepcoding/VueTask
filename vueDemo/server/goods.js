let db = require('./db')

exports.goods = (req, res) => {
  var sql = 'select * from goods_info'
  db.query(sql, [req.query.name, req.query.price, req.query.sales, req.query.pic], (err, data) => {
    if (err) {
      res.send(err)
    }
    res.send(data)
  })
}
