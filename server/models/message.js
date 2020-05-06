module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('message', {
    content: DataTypes.STRING,
    author_id: DataTypes.BOOLEAN
  });
  return Messages;
}