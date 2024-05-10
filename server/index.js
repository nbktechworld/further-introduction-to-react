const express = require('express');
const cors = require('cors');
const fs = require('fs');
const pg = require('pg');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json())

async function setupApp() {
  const pgClient = new pg.Client({
    database: process.env.DATABASE_DATABASE,
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USER,
  });
  await pgClient.connect();

  // HTTP  ... RESTful ......
  // GET /posts
  app.get('/posts', function(req, res) {
    res.set('Content-Type', 'application/json')
    pgClient.query('SELECT * FROM posts;').then((result) => {
      res.send(result.rows);
    })
  })

  // POST /posts
  app.post('/posts', async function(req, res) {
    const newPost = {
      title: req.body.title
    };

    // We would typically filter out undesired properties and validate them before doing anything with database.
    const current_user = { id: 1 }; // assume it was defined somewhere else in the authn pipeline. For the sake of this lesson, hardcode here.
    let result
    try {
      result = await pgClient.query('INSERT INTO posts (title, body, user_id) VALUES ($1, $2, $3) RETURNING *', [newPost.title, newPost.body, current_user.id])
    } catch (error) {
      // report error, handle error, etc
      console.error(error);
      return res.status(500).send();
    }

    return res.send(result.rows[0]);
  })

  app.listen(3001, function() {
    console.log('Server is running at http://localhost:3001')
  });
}

setupApp();
