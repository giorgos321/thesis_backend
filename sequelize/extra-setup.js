function applyExtraSetup(sequelize) {
	const { teacher, lab, student, labInstance, subscription, user, roles } = sequelize.models;



	lab.hasMany(labInstance, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
	labInstance.belongsTo(lab, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

	teacher.hasMany(labInstance, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
	labInstance.belongsTo(teacher, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

	// lab.belongsToMany(teacher, { through: { model: labInstance, unique: false },foreignKey: 'labId' });
	// teacher.belongsToMany(lab, { through: { model: labInstance, unique: false },foreignKey: 'teacherId' });

	labInstance.belongsToMany(student, { through: { model: subscription, unique: false } });
	student.belongsToMany(labInstance, { through: { model: subscription, unique: false } });

	roles.belongsToMany(user, {
		through: "user_roles",
		foreignKey: "roleId",
		otherKey: "userId"
	});
	user.belongsToMany(roles, {
		through: "user_roles",
		foreignKey: "userId",
		otherKey: "roleId"
	});

}

module.exports = { applyExtraSetup };
