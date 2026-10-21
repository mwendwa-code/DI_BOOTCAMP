# JWT Authentication in Node.js with Express

## Checklist

- [ ] Understand the JWT structure and the difference between authentication and authorization.
- [ ] Install Node.js and npm, then initialize this project with `npm install`.
- [ ] Configure separate, randomly generated access-token and refresh-token secrets.
- [ ] Register users with input validation and a bcrypt password hash.
- [ ] Log users in by comparing the submitted password with the stored hash.
- [ ] Issue short-lived access tokens and longer-lived refresh tokens.
- [ ] Verify access tokens in middleware before serving protected endpoints.
- [ ] Store tokens in `httpOnly` cookies and clear them on logout.
- [ ] Rotate and revoke refresh tokens when refreshing or logging out.
- [ ] Try the profile endpoints and the authentication tests.

## 1. JWT Basics

A JSON Web Token is a signed token made of three Base64URL-encoded parts: a header (algorithm and token type), a payload (claims such as the subject and expiry), and a signature. The signature detects tampering; it does not encrypt the payload. Do not put passwords or other secrets in JWT claims.

JWTs are commonly used to prove a user's identity after login and to carry authorization-related claims. The server must still enforce authorization: a valid identity token alone should not grant access to every resource.

## 2. Set Up and Run

Install a current Node.js LTS release, open this folder in a terminal, and install the dependencies:

```powershell
npm install
$env:ACCESS_TOKEN_SECRET = node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
$env:REFRESH_TOKEN_SECRET = node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
npm start
```

The example listens on port `3000`. Keep these secrets outside source control and use different values in production. `body-parser` parses JSON and `cookie-parser` makes request cookies available to routes.

## 3. Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/auth/register` | Validate credentials, hash the password, and issue cookies |
| `POST` | `/auth/login` | Verify credentials and issue cookies |
| `GET` | `/auth/me` | Return the current user; requires a valid access token |
| `POST` | `/auth/refresh` | Consume the current refresh token and rotate both tokens |
| `POST` | `/auth/logout` | Revoke the current refresh token and clear cookies |
| `GET` | `/api/profile` | Read the authenticated user's profile |
| `PATCH` | `/api/profile` | Update the authenticated user's display name |

Both registration and login set a 15-minute access token and a 7-day refresh token. The refresh token is single-use: refresh rotation and logout remove it from the server-side allowlist. The login and refresh routes are rate-limited.

## 4. Try It

Use an API client such as `curl` or the REST Client extension. Preserve cookies between requests; the browser handles this automatically when calling the same origin.

```http
POST http://localhost:3000/auth/register
Content-Type: application/json

{"username":"student_1","password":"learning1234"}
```

Then try `GET /api/profile`, `PATCH /api/profile` with `{"displayName":"Student"}`, `POST /auth/refresh`, and `POST /auth/logout`. A protected endpoint without a valid access cookie responds with `401`; invalid input returns `400`; a duplicate username returns `409`.

Run the focused flow test with `npm test`. It checks registration, profile protection, refresh-token rotation, and logout revocation.

## 5. Exercises and Security Notes

- [ ] Replace the in-memory user and refresh-token stores with a database and persistent revocation records.
- [ ] Add email confirmation with expiring, single-use confirmation tokens.
- [ ] Add stronger username and password policy, and account recovery.
- [ ] Revoke all of a user's sessions after a password change or account compromise.
- [ ] Add CSRF defenses if deploying cookies in a cross-site setup; `SameSite` is useful defense-in-depth, not a complete substitute for a considered CSRF policy.
- [ ] Add authorization checks for roles and resource ownership.

This is an educational example: in-memory data disappears on restart and does not work across multiple server instances. In production, use a database, HTTPS, carefully managed secrets, monitoring, and reviewed session/CSRF policies. JWT authentication is only one part of application security; authorization must be checked separately on every protected operation.