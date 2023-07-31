function applyExtraSetup(sequelize) {
	const { teacher, lab, student, labInstance, subscription, user, roles } = sequelize.models;



	lab.hasMany(labInstance, { foreignKey: { allowNull: false }, constraints: false });
	labInstance.belongsTo(lab, { foreignKey: { allowNull: false }, constraints: false });

	user.hasMany(labInstance, { foreignKey: 'teacherId', constraints: false });
	labInstance.belongsTo(user, { foreignKey: 'teacherId', constraints: false });

	labInstance.belongsToMany(student, { through: { model: subscription, unique: false },constraints: false });
	student.belongsToMany(labInstance, { through: { model: subscription, unique: false },constraints: false });

	labInstance.beforeBulkDestroy(async (options) => {
		const instances = await labInstance.findAll({
			where: options.where,
			raw: true
		});
		await subscription.destroy({
			where:{
				labInstanceId: instances.map(i => i.id)
			}
		})
	});

	// labInstance.beforeBulkDestroy(async (options) => {
	// 	const instances = await labInstance.findAll({
	// 		where: options.where,
	// 		raw: true
	// 	});
	// 	await subscription.destroy({
	// 		where:{
	// 			studentId: instances.map(i => i.id)
	// 		}
	// 	})
	// });

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
