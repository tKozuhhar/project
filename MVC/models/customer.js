const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer', {
    customer_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'store',
        key: 'store_id'
      }
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'address',
        key: 'address_id'
      }
    },
    activebool: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    create_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: "(now"
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'customer',
    schema: 'public',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "customer_pkey",
        unique: true,
        fields: [
          { name: "customer_id" },
        ]
      },
      {
        name: "idx_fk_address_id",
        fields: [
          { name: "address_id" },
        ]
      },
      {
        name: "idx_fk_store_id",
        fields: [
          { name: "store_id" },
        ]
      },
      {
        name: "idx_last_name",
        fields: [
          { name: "last_name" },
        ]
      },
    ]
  });
};
