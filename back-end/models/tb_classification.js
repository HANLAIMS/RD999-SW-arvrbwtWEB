const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_classification', {
    id_classification: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    classification_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "tb_classification_unq"
    },
    classification_country: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    classification_adress: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    classification_call: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_classification',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tb_classification_pkey",
        unique: true,
        fields: [
          { name: "id_classification" },
        ]
      },
      {
        name: "tb_classification_unq",
        unique: true,
        fields: [
          { name: "classification_name" },
        ]
      },
    ]
  });
};
