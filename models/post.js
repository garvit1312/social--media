// models/post.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Post', {
    imageLink: {
      type: DataTypes.STRING(1000), // Explicitly set the length
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};
