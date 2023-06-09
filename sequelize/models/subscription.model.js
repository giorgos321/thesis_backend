const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('subscription', {
        absense: {
			defaultValue: 0,
			type: DataTypes.INTEGER
		},
        labInstanceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        subscriptionDate:{
            type:DataTypes.DATE,
            allowNull: false,
            primaryKey: true
        }
      });
}

