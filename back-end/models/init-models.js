var DataTypes = require("sequelize").DataTypes;
var _sql_saver = require("./sql_saver");
var _tb_classification = require("./tb_classification");
var _tb_hull = require("./tb_hull");
var _tb_hull_classification = require("./tb_hull_classification");
var _tb_hull_product = require("./tb_hull_product");
var _tb_license = require("./tb_license");
var _tb_operation_mode = require("./tb_operation_mode");
var _tb_owner = require("./tb_owner");
var _tb_product = require("./tb_product");
var _tb_product_classification = require("./tb_product_classification");
var _tb_user = require("./tb_user");

function initModels(sequelize) {
  var sql_saver = _sql_saver(sequelize, DataTypes);
  var tb_classification = _tb_classification(sequelize, DataTypes);
  var tb_hull = _tb_hull(sequelize, DataTypes);
  var tb_hull_classification = _tb_hull_classification(sequelize, DataTypes);
  var tb_hull_product = _tb_hull_product(sequelize, DataTypes);
  var tb_license = _tb_license(sequelize, DataTypes);
  var tb_operation_mode = _tb_operation_mode(sequelize, DataTypes);
  var tb_owner = _tb_owner(sequelize, DataTypes);
  var tb_product = _tb_product(sequelize, DataTypes);
  var tb_product_classification = _tb_product_classification(sequelize, DataTypes);
  var tb_user = _tb_user(sequelize, DataTypes);

  tb_hull_classification.belongsTo(tb_classification, { as: "id_classification_tb_classification", foreignKey: "id_classification"});
  tb_classification.hasMany(tb_hull_classification, { as: "tb_hull_classifications", foreignKey: "id_classification"});
  tb_product_classification.belongsTo(tb_classification, { as: "id_classification_tb_classification", foreignKey: "id_classification"});
  tb_classification.hasMany(tb_product_classification, { as: "tb_product_classifications", foreignKey: "id_classification"});
  tb_hull_classification.belongsTo(tb_hull, { as: "id_hull_tb_hull", foreignKey: "id_hull"});
  tb_hull.hasMany(tb_hull_classification, { as: "tb_hull_classifications", foreignKey: "id_hull"});
  tb_hull_product.belongsTo(tb_hull, { as: "id_hull_tb_hull", foreignKey: "id_hull"});
  tb_hull.hasMany(tb_hull_product, { as: "tb_hull_products", foreignKey: "id_hull"});
  tb_operation_mode.belongsTo(tb_hull, { as: "operation_hull_tb_hull", foreignKey: "operation_hull"});
  tb_hull.hasMany(tb_operation_mode, { as: "tb_operation_modes", foreignKey: "operation_hull"});
  tb_user.belongsTo(tb_license, { as: "user_license_tb_license", foreignKey: "user_license"});
  tb_license.hasMany(tb_user, { as: "tb_users", foreignKey: "user_license"});
  tb_hull.belongsTo(tb_owner, { as: "hull_owner_tb_owner", foreignKey: "hull_owner"});
  tb_owner.hasMany(tb_hull, { as: "tb_hulls", foreignKey: "hull_owner"});
  tb_license.belongsTo(tb_owner, { as: "license_owner_tb_owner", foreignKey: "license_owner"});
  tb_owner.hasMany(tb_license, { as: "tb_licenses", foreignKey: "license_owner"});
  tb_hull_product.belongsTo(tb_product, { as: "id_product_tb_product", foreignKey: "id_product"});
  tb_product.hasMany(tb_hull_product, { as: "tb_hull_products", foreignKey: "id_product"});
  tb_product_classification.belongsTo(tb_product, { as: "id_product_tb_product", foreignKey: "id_product"});
  tb_product.hasMany(tb_product_classification, { as: "tb_product_classifications", foreignKey: "id_product"});

  return {
    sql_saver,
    tb_classification,
    tb_hull,
    tb_hull_classification,
    tb_hull_product,
    tb_license,
    tb_operation_mode,
    tb_owner,
    tb_product,
    tb_product_classification,
    tb_user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
