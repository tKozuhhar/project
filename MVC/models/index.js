const Sequelize = require('sequelize');
const ActorModel = require('./actor');
const FilmModel = require('./film');
const FilmActorModel = require('./film_actor');
const FilmCategoryModel = require('./film_category');

// Initialize Sequelize instance
const sequelize = new Sequelize('postgres', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  // Other options as needed
});

// Define models
const Actor = ActorModel(sequelize, Sequelize.DataTypes);
const Film = FilmModel(sequelize, Sequelize.DataTypes);
const FilmActor = FilmActorModel(sequelize, Sequelize.DataTypes);
const FilmCategory = FilmCategoryModel(sequelize, Sequelize.DataTypes);

// Define associations
Actor.belongsToMany(Film, { through: FilmActor, foreignKey: 'actor_id' });
Film.belongsToMany(Actor, { through: FilmActor, foreignKey: 'film_id' });

Film.belongsToMany(Category, { through: FilmCategory, foreignKey: 'film_id' });
Category.belongsToMany(Film, { through: FilmCategory, foreignKey: 'category_id' });

// Export models
module.exports = {
  Actor,
  Film,
  FilmActor,
  FilmCategory
  // Other models if needed
};
