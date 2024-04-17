const express = require('express');
const posts = require('./posts.json')
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json())

// HTTP  ... RESTful ......
// GET /posts
app.get('/posts', function(req, res) {
  res.set('Content-Type', 'application/json')
  res.send(posts)
})

// POST /posts
app.post('/posts', function(req, res) {
  const newPost = {
    title: req.body.title
  };

  posts.push(newPost)
  fs.writeFileSync('posts.json', JSON.stringify(posts, null, 2), { encoding: 'utf-8' })

  res.send(newPost)
})

app.listen(3001, function() {
  console.log('Server is running at http://localhost:3001')
});
