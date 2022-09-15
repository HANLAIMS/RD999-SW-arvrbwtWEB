const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_owner', {
    id_owner: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    owner_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    owner_country: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    owner_code: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_owner',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tb_owner_pkey",
        unique: true,
        fields: [
          { name: "id_owner" },
        ]
      },
    ]
  });
};
