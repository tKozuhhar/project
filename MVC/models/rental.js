const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rental', {
    rental_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rental_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    inventory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'inventory',
        key: 'inventory_id'
      }
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customer',
        key: 'customer_id'
      }
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    staff_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'staff',
        key: 'staff_id'
      }
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'rental',
    schema: 'public',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "idx_fk_inventory_id",
        fields: [
          { name: "inventory_id" },
        ]
      },
      {
        name: "idx_unq_rental_rental_date_inventory_id_customer_id",
        unique: true,
        fields: [
          { name: "rental_date" },
          { name: "inventory_id" },
          { name: "customer_id" },
        ]
      },
      {
        name: "rental_pkey",
        unique: true,
        fields: [
          { name: "rental_id" },
        ]
      },
    ]
  });
};
