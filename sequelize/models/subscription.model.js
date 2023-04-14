const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('subscription', {
        absense: {
			defaultValue: 0,
			type: DataTypes.INTEGER
		}
      });
}

