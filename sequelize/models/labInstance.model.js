const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('labInstance', {
        // LabId: {
        //   type: DataTypes.INTEGER,
        //   references: {
        //     model: 'lab',
        //     key: 'id'
        //   }
        // },
        // TeacherId: {
        //   type: DataTypes.INTEGER,
        //   references: {
        //     model: 'teacher',
        //     key: 'id'
        //   }
        // },
        id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
        day:{
            allowNull: false,
            type: DataTypes.ENUM(['0','1','2','3','4','5','6'])
        },
        StartAt: {
            allowNull: false,
            type: DataTypes.TIME
        },
        EndAt: {
            allowNull: false,
            type: DataTypes.TIME
        },
        StartRange: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        EndRange: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        StartAt: {
            allowNull: true,
            type: DataTypes.TIME,
        },
        EndAt: {
            allowNull: true,
            type: DataTypes.TIME,
        }
      });
}

