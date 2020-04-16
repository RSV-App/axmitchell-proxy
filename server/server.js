require('newrelic');
const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());
app.use('/:id', express.static(
  path.resolve(__dirname, '..', 'public'),
));

reservationsServer = 'http://35.163.170.86';
menuServer = 'http://54.186.26.38';
reviewsServer = 'http://54.214.131.42';

const redirectRequest = ({ method, originalUrl, params, }, domain) => (
  axios({
    url: `${domain}${originalUrl}`,
    method,
    params,
  })
);

app.get('/:id/reservations', (req, res) => {
  redirectRequest(req, reservationsServer)
    .then(({ data }) => {
      res.send(data);
    });
});

app.get('/:id/reviews', (req, res) => {
  redirectRequest(req, reviewsServer)
    .then(({ data }) => {
      res.send(data);
    });
});

app.get('/api/menu/:id', (req, res) => {
  redirectRequest(req, menuServer)
    .then(({ data }) => {
      res.send(data);
    });
});

app.listen(port, () => console.log(`Master app listening on port ${port}`));