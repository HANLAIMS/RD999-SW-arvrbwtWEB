const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_product', {
    id_product: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    product_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    product_version: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    product_code: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_product',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tb_product_pkey",
        unique: true,
        fields: [
          { name: "id_product" },
        ]
      },
    ]
  });
};
