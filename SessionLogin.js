const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

// Show the login form
app.get('/login', (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form method="post" action="/login">
      <input name="username" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  `);
});

// Handle login form submission
app.post('/login', (req, res) => {
  // Always accept any non-empty username and password for demo
  if (req.body.username && req.body.password) {
    req.session.username = req.body.username;
    res.redirect('/welcome');
  } else {
    res.redirect('/login');
  }
});

// Protected welcome page
app.get('/welcome', (req, res) => {
  if (req.session.username) {
    res.send(`
      <h2>Welcome, ${req.session.username}!</h2>
      <a href="/logout">Logout</a>
    `);
  } else {
    res.redirect('/login');
  }
});

// Logout: destroys the session
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

app.listen(3000, () => {
  console.log('Server started: http://localhost:3000/login');
});
