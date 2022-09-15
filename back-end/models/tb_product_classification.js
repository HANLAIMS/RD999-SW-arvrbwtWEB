const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_product_classification', {
    id_product_classification: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    id_product: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tb_product',
        key: 'id_product'
      }
    },
    id_classification: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tb_classification',
        key: 'id_classification'
      }
    },
    remark: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_product_classification',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tb_product_classification_pkey",
        unique: true,
        fields: [
          { name: "id_product_classification" },
        ]
      },
    ]
  });
};
