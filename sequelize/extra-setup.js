function applyExtraSetup(sequelize) {
	const { teacher, lab, student, labInstance, subscription, user, roles } = sequelize.models;



	lab.hasMany(labInstance, { foreignKey: { allowNull: false }, constraints: false });
	labInstance.belongsTo(lab, { foreignKey: { allowNull: false }, constraints: false });

	teacher.hasMany(labInstance, { foreignKey: { allowNull: false }, constraints: false });
	labInstance.belongsTo(teacher, { foreignKey: { allowNull: false }, constraints: false });

	// lab.belongsToMany(teacher, { through: { model: labInstance, unique: false },foreignKey: 'labId' });
	// teacher.belongsToMany(lab, { through: { model: labInstance, unique: false },foreignKey: 'teacherId' });

	labInstance.belongsToMany(student, { through: { model: subscription, unique: false },constraints: false });
	student.belongsToMany(labInstance, { through: { model: subscription, unique: false },constraints: false });

	roles.belongsToMany(user, {
		through: "user_roles",
		foreignKey: "roleId",
		otherKey: "userId",
		constraints: false,
	});
	user.belongsToMany(roles, {
		through: "user_roles",
		foreignKey: "userId",
		otherKey: "roleId",
		constraints: false,
	});

}

module.exports = { applyExtraSetup };
