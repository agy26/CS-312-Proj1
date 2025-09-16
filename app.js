const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Temporary in-memory storage
let posts = [];
let idCounter = 1;

// Routes
app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/create', (req, res) => {
  const { author, title, content, category } = req.body;
  const post = {
    id: idCounter++,
    author,
    title,
    content,
    category,
    createdAt: new Date().toLocaleString()
  };
  posts.push(post);
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render('edit', { post });
});

app.post('/update/:id', (req, res) => {
  const { author, title, content, category } = req.body;
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === id);
  posts[postIndex] = { ...posts[postIndex], author, title, content, category };
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});