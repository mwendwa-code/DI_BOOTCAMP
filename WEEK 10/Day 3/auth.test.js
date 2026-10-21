const { randomBytes } = require('node:crypto');
const { after, before, test } = require('node:test');
const assert = require('node:assert/strict');

process.env.ACCESS_TOKEN_SECRET = randomBytes(32).toString('hex');
process.env.REFRESH_TOKEN_SECRET = randomBytes(32).toString('hex');

const app = require('./Exercise xp');
let server;
let baseUrl;

function cookieFrom(response, name) {
  const headers = response.headers.getSetCookie
    ? response.headers.getSetCookie()
    : (response.headers.get('set-cookie') || '').split(/, (?=[^;,]+=)/);
  const cookie = headers.find((header) => header.startsWith(`${name}=`));
  assert.ok(cookie, `Expected ${name} cookie`);
  return cookie.split(';')[0];
}

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

test('register, authenticate, rotate refresh token, and revoke it on logout', async () => {
  const registration = await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username: 'student_1', password: 'learning1234' }),
  });

  assert.equal(registration.status, 201);
  const user = (await registration.json()).user;
  assert.equal(user.username, 'student_1');
  assert.equal('passwordHash' in user, false);

  const accessCookie = cookieFrom(registration, 'access_token');
  const oldRefreshCookie = cookieFrom(registration, 'refresh_token');
  const profile = await fetch(`${baseUrl}/api/profile`, {
    headers: { cookie: accessCookie },
  });
  assert.equal(profile.status, 200);

  const refreshed = await fetch(`${baseUrl}/auth/refresh`, {
    method: 'POST',
    headers: { cookie: oldRefreshCookie },
  });
  assert.equal(refreshed.status, 200);

  const replayed = await fetch(`${baseUrl}/auth/refresh`, {
    method: 'POST',
    headers: { cookie: oldRefreshCookie },
  });
  assert.equal(replayed.status, 401);

  const currentRefreshCookie = cookieFrom(refreshed, 'refresh_token');
  const logout = await fetch(`${baseUrl}/auth/logout`, {
    method: 'POST',
    headers: { cookie: currentRefreshCookie },
  });
  assert.equal(logout.status, 204);

  const revoked = await fetch(`${baseUrl}/auth/refresh`, {
    method: 'POST',
    headers: { cookie: currentRefreshCookie },
  });
  assert.equal(revoked.status, 401);
});