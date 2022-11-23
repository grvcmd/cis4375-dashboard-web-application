module.exports = (sequelize, Sequelize) => {
  const Location = sequelize.define("locations", {
    c_id: { // FK
      type: Sequelize.STRING,
    },
    loc_id: { // PK 
      type: Sequelize.STRING,
      primaryKey: true
    },
    first_date_op: {
      type: Sequelize.DATEONLY,
    },
    purchase_price: {
      type: Sequelize.DECIMAL(20, 2),
    },
    purchase_date: {
      type: Sequelize.DATEONLY,
    },
    lease_exp_date: {
      type: Sequelize.DATEONLY,
    },
    rent: {
      type: Sequelize.DECIMAL(20, 2),
    },
    property_owner_company: {
      type: Sequelize.STRING,
    },
    property_owner_ein: {
      type: Sequelize.INTEGER,
    },
    c_address: {
      type: Sequelize.STRING,
    },
    c_mailAdress: {
      type: Sequelize.STRING,
    },
    c_city: {
      type: Sequelize.STRING,
    },
    c_county: {
      type: Sequelize.STRING,
    },
    c_email: {
      type: Sequelize.STRING,
    },
    c_locationName: {
      type: Sequelize.STRING,
    },
    c_phoneNumber: {
      type: Sequelize.STRING,
    },
  }, {
    // This tells Sequelize to not pluralize the  given table name
    freezeTableName: true,
    // Disable adding updatedAt, createdAt timestamp attributes
    timestamps: false
  });

  return Location;
};