const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payment_p2007_03', {
    payment_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customer',
        key: 'customer_id'
      }
    },
    staff_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'staff',
        key: 'staff_id'
      }
    },
    rental_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'rental',
        key: 'rental_id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'payment_p2007_03',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "idx_fk_payment_p2007_03_customer_id",
        fields: [
          { name: "customer_id" },
        ]
      },
      {
        name: "idx_fk_payment_p2007_03_staff_id",
        fields: [
          { name: "staff_id" },
        ]
      },
    ]
  });
};
