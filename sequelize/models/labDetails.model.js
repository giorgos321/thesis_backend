const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('labDetails', {
        // The following specification of the 'id' attribute could be omitted
        // since it is the default.
        StartRange: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        EndRange: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        StartAt: {
            allowNull: false,
            type: DataTypes.TIME,
        },
        EndAt: {
            allowNull: false,
            type: DataTypes.TIME,
        }
    });
}


