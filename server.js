// const Puppeteer = require('puppeteer')  

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.get('/download', (req, res) => {
  res.jsonp(req.query)
})

server.listen(port, function () {
  console.log('JSON Server is running')
})