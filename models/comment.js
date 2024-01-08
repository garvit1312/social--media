const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Comment', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
