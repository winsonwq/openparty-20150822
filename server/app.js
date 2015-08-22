const express = require('express');
const es = require('event-stream');
const R = require('ramda');
const app = express();

function matchUser(username, password) {
  return es.mapSync(function(loginData) {
    if (loginData && loginData.username == username && loginData.password == password) {
      return { username: username, gender: 'male' };
    }
    return null;
  })
}

function filter(func) {
  return es.through(function(data) {
    if (func(data)) {
      this.emit('data', data);
    }
  })
}

function isNotNil(data) {
  return data != null;
}

function isNil(data) {
  return data == null;
}

function mapSync(funcOrData) {
  if (typeof funcOrData == 'function') {
    return es.mapSync(funcOrData);
  } else {
    return es.through(function() {
      this.emit('data', funcOrData);
    });
  }
}

function run(func) {
  return es.through(function(data) {
    func(data);
    this.emit('data', data);
  })
}

app.get('/', function(req, resp) {
  resp.end('hello world');
})

app.post('/login', function(req, resp) {
  resp.type('json');

  const body = req.pipe(es.wait()).pipe(es.parse());
  const matachUser = body.pipe(matchUser('wangqiu', '111'));

  // login success
  const loginSuccessUser = matachUser.pipe(filter(isNotNil));

  // login fail
  const loginFailError = matachUser
    .pipe(filter(isNil))
    .pipe(mapSync({ error: 'user not found' }))
    .pipe(run(function(error) {
      resp.status(400);
    }));

  es.merge(
      loginSuccessUser,
      loginFailError
    )
    .pipe(es.stringify())
    .pipe(resp);

});

app.listen(9997);
