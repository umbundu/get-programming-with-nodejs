'use strict';

const port = 3000,
  express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  homeController = require('./controllers/homeController');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
})

app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
});

app.get('/items/:vegetable', homeController.sendReqParam);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
