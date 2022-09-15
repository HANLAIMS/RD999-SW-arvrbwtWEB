const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_operation_mode', {
    id_operation_mode: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    operation_hull: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tb_hull',
        key: 'id_hull'
      }
    },
    operation_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    operation_target_schema: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    operation_target_table: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_operation_mode',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tb_operation_mode_pkey",
        unique: true,
        fields: [
          { name: "id_operation_mode" },
        ]
      },
    ]
  });
};
