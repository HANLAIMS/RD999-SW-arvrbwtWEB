const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_user', {
    id_user: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_license: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tb_license',
        key: 'id_license'
      }
    },
    user_account: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: "tb_user_unq"
    },
    user_password: {
      type: DataTypes.STRING(93),
      allowNull: false
    },
    user_lock: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    user_try_limit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    user_hint: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    user_answer: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    user_email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    user_approval_level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_registration_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    user_modification_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_user',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tb_user_pkey",
        unique: true,
        fields: [
          { name: "id_user" },
        ]
      },
      {
        name: "tb_user_unq",
        unique: true,
        fields: [
          { name: "user_account" },
        ]
      },
    ]
  });
};
