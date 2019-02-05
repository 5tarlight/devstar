module.exports.index = (req, res) => {
  console.log(req.ip + ' : portal')
  

  req.app.render('index', {}, (err, html) => {
    if(err) {
      res.writeHead({'Content-type' : 'text/html;charset=utf8'})
      console.err('뷰 렌더링중 오류발생' + err.stack)
      res.write('<h1>뷰 렌더링중 오류 발생</h1>')
      res.write('<p>' + err.stack + '</p>')
      res.end()
      return
    }
    res.end(html)
  })
}