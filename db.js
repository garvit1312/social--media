const { Sequelize } = require('sequelize');
const PostModel = require('./models/post');
const CommentModel = require('./models/comment');

const sequelize = new Sequelize('socialmedia', 'root', 'mod@1999', {
  host: 'localhost',
  dialect: 'mysql',
});

const Post = PostModel(sequelize);
const Comment = CommentModel(sequelize);

Post.hasMany(Comment);
Comment.belongsTo(Post);

module.exports = {
  sequelize,
  Post,
  Comment,
};

