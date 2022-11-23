/*
Will reflect the company_licenses association table.
*/
module.exports = (sequelize, Sequelize) => {
  const Company_License = sequelize.define("company_licenses", {
    l_id: {
      type: Sequelize.STRING,
      primaryKey:true
    },
    license_status: {
      type: Sequelize.STRING,
    },
    license_status_date: {
      type: Sequelize.DATEONLY,
    },
    loc_id: { // FK // Location ID
      type: Sequelize.STRING,
    },
    license_name: {
      type: Sequelize.STRING,
    },
    license_cost: {
      type: Sequelize.DECIMAL(20, 2),
    },
    // license_expire_date: {
    //   type: Sequelize.DATEONLY
    // }
  }, {
    // This tells Sequelize to not pluralize the given table name
    freezeTableName: true,
    // Disable adding updatedAt, createdAt timestamp attributes
    timestamps: false
  });

  return Company_License;
};