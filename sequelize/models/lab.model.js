const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('lab', {
        // The following specification of the 'id' attribute could be omitted
        // since it is the default.
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        lab_name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        lab_description: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: false
        },
        lab_year: {
            allowNull: false,
            type: DataTypes.INTEGER,
            unique: false
        },
        lab_semester: {
            allowNull: false,
            type: DataTypes.INTEGER,
            unique: false
        }
    });
}