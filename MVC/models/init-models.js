var DataTypes = require("sequelize").DataTypes;
var _actor = require("./actor");
var _address = require("./address");
var _category = require("./category");
var _city = require("./city");
var _country = require("./country");
var _customer = require("./customer");
var _film = require("./film");
var _film_actor = require("./film_actor");
var _film_category = require("./film_category");
var _inventory = require("./inventory");
var _language = require("./language");
var _payment = require("./payment");
var _payment_p2007_01 = require("./payment_p2007_01");
var _payment_p2007_02 = require("./payment_p2007_02");
var _payment_p2007_03 = require("./payment_p2007_03");
var _payment_p2007_04 = require("./payment_p2007_04");
var _payment_p2007_05 = require("./payment_p2007_05");
var _payment_p2007_06 = require("./payment_p2007_06");
var _rental = require("./rental");
var _staff = require("./staff");
var _store = require("./store");

function initModels(sequelize) {
  var actor = _actor(sequelize, DataTypes);
  var address = _address(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var city = _city(sequelize, DataTypes);
  var country = _country(sequelize, DataTypes);
  var customer = _customer(sequelize, DataTypes);
  var film = _film(sequelize, DataTypes);
  var film_actor = _film_actor(sequelize, DataTypes);
  var film_category = _film_category(sequelize, DataTypes);
  var inventory = _inventory(sequelize, DataTypes);
  var language = _language(sequelize, DataTypes);
  var payment = _payment(sequelize, DataTypes);
  var payment_p2007_01 = _payment_p2007_01(sequelize, DataTypes);
  var payment_p2007_02 = _payment_p2007_02(sequelize, DataTypes);
  var payment_p2007_03 = _payment_p2007_03(sequelize, DataTypes);
  var payment_p2007_04 = _payment_p2007_04(sequelize, DataTypes);
  var payment_p2007_05 = _payment_p2007_05(sequelize, DataTypes);
  var payment_p2007_06 = _payment_p2007_06(sequelize, DataTypes);
  var rental = _rental(sequelize, DataTypes);
  var staff = _staff(sequelize, DataTypes);
  var store = _store(sequelize, DataTypes);

  actor.belongsToMany(film, { as: 'film_id_films', through: film_actor, foreignKey: "actor_id", otherKey: "film_id" });
  category.belongsToMany(film, { as: 'film_id_film_film_categories', through: film_category, foreignKey: "category_id", otherKey: "film_id" });
  film.belongsToMany(actor, { as: 'actor_id_actors', through: film_actor, foreignKey: "film_id", otherKey: "actor_id" });
  film.belongsToMany(category, { as: 'category_id_categories', through: film_category, foreignKey: "film_id", otherKey: "category_id" });
  film_actor.belongsTo(actor, { as: "actor", foreignKey: "actor_id"});
  actor.hasMany(film_actor, { as: "film_actors", foreignKey: "actor_id"});
  customer.belongsTo(address, { as: "address", foreignKey: "address_id"});
  address.hasMany(customer, { as: "customers", foreignKey: "address_id"});
  staff.belongsTo(address, { as: "address", foreignKey: "address_id"});
  address.hasMany(staff, { as: "staffs", foreignKey: "address_id"});
  store.belongsTo(address, { as: "address", foreignKey: "address_id"});
  address.hasMany(store, { as: "stores", foreignKey: "address_id"});
  film_category.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(film_category, { as: "film_categories", foreignKey: "category_id"});
  address.belongsTo(city, { as: "city", foreignKey: "city_id"});
  city.hasMany(address, { as: "addresses", foreignKey: "city_id"});
  city.belongsTo(country, { as: "country", foreignKey: "country_id"});
  country.hasMany(city, { as: "cities", foreignKey: "country_id"});
  payment.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(payment, { as: "payments", foreignKey: "customer_id"});
  payment_p2007_01.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(payment_p2007_01, { as: "payment_p2007_01s", foreignKey: "customer_id"});
  payment_p2007_02.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(payment_p2007_02, { as: "payment_p2007_02s", foreignKey: "customer_id"});
  payment_p2007_03.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(payment_p2007_03, { as: "payment_p2007_03s", foreignKey: "customer_id"});
  payment_p2007_04.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(payment_p2007_04, { as: "payment_p2007_04s", foreignKey: "customer_id"});
  payment_p2007_05.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(payment_p2007_05, { as: "payment_p2007_05s", foreignKey: "customer_id"});
  payment_p2007_06.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(payment_p2007_06, { as: "payment_p2007_06s", foreignKey: "customer_id"});
  rental.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(rental, { as: "rentals", foreignKey: "customer_id"});
  film_actor.belongsTo(film, { as: "film", foreignKey: "film_id"});
  film.hasMany(film_actor, { as: "film_actors", foreignKey: "film_id"});
  film_category.belongsTo(film, { as: "film", foreignKey: "film_id"});
  film.hasMany(film_category, { as: "film_categories", foreignKey: "film_id"});
  inventory.belongsTo(film, { as: "film", foreignKey: "film_id"});
  film.hasMany(inventory, { as: "inventories", foreignKey: "film_id"});
  rental.belongsTo(inventory, { as: "inventory", foreignKey: "inventory_id"});
  inventory.hasMany(rental, { as: "rentals", foreignKey: "inventory_id"});
  film.belongsTo(language, { as: "language", foreignKey: "language_id"});
  language.hasMany(film, { as: "films", foreignKey: "language_id"});
  film.belongsTo(language, { as: "original_language", foreignKey: "original_language_id"});
  language.hasMany(film, { as: "original_language_films", foreignKey: "original_language_id"});
  payment.belongsTo(rental, { as: "rental", foreignKey: "rental_id"});
  rental.hasMany(payment, { as: "payments", foreignKey: "rental_id"});
  payment_p2007_01.belongsTo(rental, { as: "rental", foreignKey: "rental_id"});
  rental.hasMany(payment_p2007_01, { as: "payment_p2007_01s", foreignKey: "rental_id"});
  payment_p2007_02.belongsTo(rental, { as: "rental", foreignKey: "rental_id"});
  rental.hasMany(payment_p2007_02, { as: "payment_p2007_02s", foreignKey: "rental_id"});
  payment_p2007_03.belongsTo(rental, { as: "rental", foreignKey: "rental_id"});
  rental.hasMany(payment_p2007_03, { as: "payment_p2007_03s", foreignKey: "rental_id"});
  payment_p2007_04.belongsTo(rental, { as: "rental", foreignKey: "rental_id"});
  rental.hasMany(payment_p2007_04, { as: "payment_p2007_04s", foreignKey: "rental_id"});
  payment_p2007_05.belongsTo(rental, { as: "rental", foreignKey: "rental_id"});
  rental.hasMany(payment_p2007_05, { as: "payment_p2007_05s", foreignKey: "rental_id"});
  payment_p2007_06.belongsTo(rental, { as: "rental", foreignKey: "rental_id"});
  rental.hasMany(payment_p2007_06, { as: "payment_p2007_06s", foreignKey: "rental_id"});
  payment.belongsTo(staff, { as: "staff", foreignKey: "staff_id"});
  staff.hasMany(payment, { as: "payments", foreignKey: "staff_id"});
  payment_p2007_01.belongsTo(staff, { as: "staff", foreignKey: "staff_id"});
  staff.hasMany(payment_p2007_01, { as: "payment_p2007_01s", foreignKey: "staff_id"});
  payment_p2007_02.belongsTo(staff, { as: "staff", foreignKey: "staff_id"});
  staff.hasMany(payment_p2007_02, { as: "payment_p2007_02s", foreignKey: "staff_id"});
  payment_p2007_03.belongsTo(staff, { as: "staff", foreignKey: "staff_id"});
  staff.hasMany(payment_p2007_03, { as: "payment_p2007_03s", foreignKey: "staff_id"});
  payment_p2007_04.belongsTo(staff, { as: "staff", foreignKey: "staff_id"});
  staff.hasMany(payment_p2007_04, { as: "payment_p2007_04s", foreignKey: "staff_id"});
  payment_p2007_05.belongsTo(staff, { as: "staff", foreignKey: "staff_id"});
  staff.hasMany(payment_p2007_05, { as: "payment_p2007_05s", foreignKey: "staff_id"});
  payment_p2007_06.belongsTo(staff, { as: "staff", foreignKey: "staff_id"});
  staff.hasMany(payment_p2007_06, { as: "payment_p2007_06s", foreignKey: "staff_id"});
  rental.belongsTo(staff, { as: "staff", foreignKey: "staff_id"});
  staff.hasMany(rental, { as: "rentals", foreignKey: "staff_id"});
  store.belongsTo(staff, { as: "manager_staff", foreignKey: "manager_staff_id"});
  staff.hasMany(store, { as: "manager_staff_stores", foreignKey: "manager_staff_id"});
  customer.belongsTo(store, { as: "store", foreignKey: "store_id"});
  store.hasMany(customer, { as: "customers", foreignKey: "store_id"});
  inventory.belongsTo(store, { as: "store", foreignKey: "store_id"});
  store.hasMany(inventory, { as: "inventories", foreignKey: "store_id"});
  staff.belongsTo(store, { as: "store", foreignKey: "store_id"});
  store.hasMany(staff, { as: "staffs", foreignKey: "store_id"});

  return {
    actor,
    address,
    category,
    city,
    country,
    customer,
    film,
    film_actor,
    film_category,
    inventory,
    language,
    payment,
    payment_p2007_01,
    payment_p2007_02,
    payment_p2007_03,
    payment_p2007_04,
    payment_p2007_05,
    payment_p2007_06,
    rental,
    staff,
    store,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
