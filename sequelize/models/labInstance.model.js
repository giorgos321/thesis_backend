const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('labInstance', {
        id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
        daysOfWeek:{
            allowNull: false,
            type: DataTypes.ENUM(['0','1','2','3','4','5','6'])
        },
        startTime: {
            allowNull: false,
            type: DataTypes.TIME
        },
        endTime: {
            allowNull: false,
            type: DataTypes.TIME
        },
        startRecur: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        endRecur: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        color: {
            allowNull: true,
            type: DataTypes.STRING
        }
      });
}

