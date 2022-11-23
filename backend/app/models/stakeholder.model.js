module.exports = (sequelize, Sequelize) => {
  const Stakeholder = sequelize.define("stakeholders", {
    s_id: { // PK
      type: Sequelize.STRING,
      primaryKey: true
    },
    c_id: { // FK
      type: Sequelize.STRING
    },
    s_fname: {
      type: Sequelize.STRING,
    },
    s_lname: {
      type: Sequelize.STRING,
    },
    s_title: {
      type: Sequelize.STRING,
    },
    s_dob: {
      type: Sequelize.DATEONLY,
    },
    s_placeOfBirth: {
      type: Sequelize.STRING,
    },
    s_address: {
      type: Sequelize.STRING,
    },
    s_email: {
      type: Sequelize.STRING,
    },
    s_percent_ownership: {
    type: Sequelize.DECIMAL(20, 2),
    },
    s_spouse_fname: {
      type: Sequelize.STRING,
    },
    s_spouse_lname: {
      type: Sequelize.STRING,
    },
    s_loan_invested: {
      type: Sequelize.DECIMAL(20, 2),
    },
    s_personalFundsInvested: {
      type: Sequelize.DECIMAL(20, 2),
    },
  }, {
    // This tells Sequelize to not pluralize the  given table name
    freezeTableName: true,
    // Disable adding updatedAt, createdAt timestamp attributes
    timestamps: false
  });

  return Stakeholder;
};