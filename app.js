const express = require('express');
const { sequelize, Post, Comment } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/posts', async (req, res) => {
  try {
    const { imageLink, description } = req.body;
    const post = await Post.create({ imageLink, description });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new post.' });
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({ include: Comment });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve posts.' });
  }
});

app.post('/comments/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;

    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = await Comment.create({ text, PostId: postId });
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new comment.' });
  }
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
