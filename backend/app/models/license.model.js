// const { DataTypes } = require("sequelize");

// module.exports = (sequelize, Sequelize) => {
//   const License = sequelize.define("licenses", {
//     l_id: { // license id
//       type: Sequelize.STRING,
//       primaryKey: true
//     },
//     license_name: {
//       type: Sequelize.STRING,
//     },
//     license_cost: {
//       type: Sequelize.DECIMAL(20, 2),
//     },
//   }, {
//     // This tells Sequelize to not pluralize the  given table name
//     freezeTableName: true,
//     // Disable adding updatedAt, createdAt timestamp attributes
//     timestamps: false
//   });

//   return License;
// };