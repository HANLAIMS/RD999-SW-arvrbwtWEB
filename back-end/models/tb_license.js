const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_license', {
    id_license: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    license_owner: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tb_owner',
        key: 'id_owner'
      }
    },
    license_key: {
      type: DataTypes.STRING(36),
      allowNull: false,
      unique: "tb_license_unq"
    },
    license_capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    license_generation_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    license_expiration_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_license',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tb_license_pkey",
        unique: true,
        fields: [
          { name: "id_license" },
        ]
      },
      {
        name: "tb_license_unq",
        unique: true,
        fields: [
          { name: "license_key" },
        ]
      },
    ]
  });
};
