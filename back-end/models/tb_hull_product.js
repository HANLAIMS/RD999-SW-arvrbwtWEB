const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_hull_product', {
    id_hull_product: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    id_hull: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tb_hull',
        key: 'id_hull'
      }
    },
    id_product: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tb_product',
        key: 'id_product'
      }
    },
    remark: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    hull_product_installed_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_hull_product',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tb_hull_product_pkey",
        unique: true,
        fields: [
          { name: "id_hull_product" },
        ]
      },
    ]
  });
};
