module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define("company", {
    c_id: { // PK
      type: Sequelize.STRING,
      primaryKey: true
    },
    c_name: {
      type: Sequelize.STRING,
    },
    c_ein: {
      type: Sequelize.INTEGER,
    },
  }, {
    // This tells Sequelize to not pluralize the  given table name
    freezeTableName: true,
    // Disable adding updatedAt, createdAt timestamp attributes
    timestamps: false
  });

  return Company;
};