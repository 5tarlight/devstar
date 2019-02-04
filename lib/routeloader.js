module.exports.init = (app, router) => {
  const routes = require('./routes/routes').routes

  for(let ind in routes) {
    if(routes[ind].type == "get") {
      router.route(routes[ind].url).get(require(routes[ind].path)[routes[ind].method])
      console.log(routes[ind].url + ' 라우팅 경로 추가됨.')
    }
  }

  app.use(router)
}