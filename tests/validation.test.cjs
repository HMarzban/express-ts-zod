const { before, after, test } = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const { app } = require('../dist/index.js');
let server, base;
before(async () => {
  server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve())));
const user = { id: 'f4152967-0752-471e-9aa1-7f41e3ce6b5e', name: 'Example User', email: 'user@example.com', age: 30 };
test('compiled app returns a valid user identifier', async () => {
  const response = await fetch(`${base}/users/${user.id}`);
  assert.equal(response.status, 200);
  assert.deepEqual((await response.json()).data, {id: user.id});
});
test('invalid identifier returns a validation error', async () => {
  const response = await fetch(`${base}/users/not-a-uuid`);
  assert.equal(response.status, 400);
  assert.equal((await response.json()).error, 'Validation failed');
});
test('valid JSON body is accepted', async () => {
  const response = await fetch(`${base}/users`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(user)});
  assert.equal(response.status, 200);
  assert.deepEqual((await response.json()).data, user);
});
test('incomplete body is rejected', async () => {
  const response = await fetch(`${base}/users`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name:'Example User'})});
  assert.equal(response.status, 400);
  const body=await response.json();
  assert.ok(body.details.some(error=>error.path.includes('email')));
});
