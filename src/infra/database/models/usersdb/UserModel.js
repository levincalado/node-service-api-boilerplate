module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define(
    'users',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'users',
      timestamps: true,
    },
  );

  /**
   * Examples on how to associate or set relationship with other models
   *
   *  UserModel.associate = function () {
   *   UserModel.belongsTo(sequelize.models.GroupModel, {
   *     foreignKey: 'groupId',
   *     as: 'group',
   *   });
   *  };
   *
   * refer to sequelize documentation https://sequelize.org/master/manual/associations.html
   */

  return UserModel;
};
