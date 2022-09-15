const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_hull_classification', {
    id_hull_classification: {
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
    },
    hull_classification_aprove_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_hull_classification',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tb_hull_classification_pkey",
        unique: true,
        fields: [
          { name: "id_hull_classification" },
        ]
      },
    ]
  });
};
