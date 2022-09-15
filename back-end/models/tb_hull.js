const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_hull', {
    id_hull: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    hull_owner: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tb_owner',
        key: 'id_owner'
      }
    },
    hull_imo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "tb_hull_unq"
    },
    hull_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    hull_loa: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    hull_lbp: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    hul_breadth: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    hull_depth: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    hull_after_end: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    hull_fore_end: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    hull_deadweight: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    hull_displacement: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    hull_lightshipweight: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    hull_grosston: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    hull_netton: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    hull_flag: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_hull',
    schema: 'public',
    timestamps: false
  });
};
