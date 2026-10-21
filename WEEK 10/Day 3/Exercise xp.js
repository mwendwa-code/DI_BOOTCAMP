const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRoutes = require('./auth.routes');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/auth', authRoutes);

app.get('/api/profile', require('./auth.middleware').authenticateToken, (req, res) => {
	const { getUserById, toPublicUser } = require('./userStore');
	const user = getUserById(req.authenticatedUserId);

	if (!user) {
		return res.status(401).json({ error: 'Authentication required.' });
	}

	return res.json({ user: toPublicUser(user) });
});

app.patch('/api/profile', require('./auth.middleware').authenticateToken, (req, res) => {
	const { updateDisplayName, toPublicUser } = require('./userStore');
	const displayName = typeof req.body.displayName === 'string' ? req.body.displayName.trim() : '';

	if (displayName.length < 1 || displayName.length > 60) {
		return res.status(400).json({ error: 'Display name must be between 1 and 60 characters.' });
	}

	return res.json({ user: toPublicUser(updateDisplayName(req.authenticatedUserId, displayName)) });
});

app.get('/', (req, res) => {
	res.json({ message: 'JWT authentication exercise. See JWT Authentication Guide.md.' });
});

if (require.main === module) {
	const port = Number(process.env.PORT) || 3000;
	app.listen(port, () => console.log(`JWT exercise listening on port ${port}`));
}

module.exports = app;
